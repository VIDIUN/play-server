#include <stdlib.h>
#include "nan.h"
#include "ts_preparer_impl.h"

using namespace v8;
using namespace node;

dynamic_buffer_t* ParseArrayOfBuffers(Local<Value> value, size_t* resultCount)
{
	if (!value->IsArray())
	{
		return NULL;
	}

	Local<Array> buffersArray = value.As<Array>();
	size_t buffersCount = buffersArray->Length();
	if (buffersCount < 1)
	{
		return NULL;
	}
	
	dynamic_buffer_t* buffers = (dynamic_buffer_t*)malloc(sizeof(dynamic_buffer_t) * buffersCount);
	if (buffers == NULL)
	{
		return NULL;
	}
	
	for (size_t i = 0; i < buffersCount; i++) 
	{
		if (!buffersArray->Get(i)->IsObject())
		{
			free(buffers);
			return NULL;
		}
		
		Local<Object> curObject = buffersArray->Get(i)->ToObject();
		if (!Buffer::HasInstance(curObject))
		{
			free(buffers);
			return NULL;
		}
	
		buffers[i].data = (byte_t*)Buffer::Data(curObject);
		buffers[i].write_pos = Buffer::Length(curObject);
	}
	
	*resultCount = buffersCount;
	
	return buffers;
}

/*
	Parameters
		Array<Buffer> fileBuffers,
		String framesInfo,
		Number cutOffset
		Boolean leftPortion
		
	Returns
		Object
			Number leftPos
			Number leftOffset
			Number rightPos
			Number rightOffset
			Buffer originalFrames
*/
NAN_METHOD(GetCutDetails) {
	NanScope();
	
	if (args.Length() < 4) 
	{
		return NanThrowTypeError("Function requires 4 arguments");
	}
	
	// validate frames info
	if (!args[1]->IsString())
	{
		return NanThrowTypeError("Argument 2 must be a string");
	}

	v8::String::Utf8Value framesBuffer(args[1]);
	
	// validate cut position
	if (!args[2]->IsNumber()) 
	{
		return NanThrowTypeError("Argument 3 must be a number");
	}
	
	// validate left portion
	if (!args[3]->IsBoolean()) 
	{
		return NanThrowTypeError("Argument 4 must be a boolean");
	}

	// parse file buffers
	size_t fileBuffersCount;
	dynamic_buffer_t* fileBuffers = ParseArrayOfBuffers(args[0], &fileBuffersCount);
	if (fileBuffers == NULL)
	{
		return NanThrowTypeError("Argument 1 must be a non-empty array of buffers");
	}
	
	// calculate the result	
	bounding_iframes_t bounding_iframes; 
	frame_info_t* original_frames;
	int original_frames_count;
	
	if (!get_cut_details(
		fileBuffers,
		fileBuffersCount,
		*framesBuffer,
		framesBuffer.length(),
		args[2]->Int32Value(),
		args[3]->BooleanValue(),
		&bounding_iframes, 
		&original_frames,
		&original_frames_count))
	{
		free(fileBuffers);
		return NanThrowTypeError("Failed to get the cut details");
	}

	free(fileBuffers);
	
	Local<Object> originalFramesBuffer = NanNewBufferHandle(
		(char*)original_frames,
		sizeof(*original_frames) * original_frames_count);
	free(original_frames);

	Local<Object> result = Object::New();
	result->Set(String::NewSymbol("leftPos"), 		Number::New(bounding_iframes.left_iframe_pos));
	result->Set(String::NewSymbol("leftOffset"), 	Number::New(bounding_iframes.left_iframe_offset));
	result->Set(String::NewSymbol("rightPos"), 		Number::New(bounding_iframes.right_iframe_pos));
	result->Set(String::NewSymbol("rightOffset"), 	Number::New(bounding_iframes.right_iframe_offset));
	result->Set(String::NewSymbol("originalFrames"), originalFramesBuffer);
	
	NanReturnValue(result);
}

/*
	Parameters
		Buffer fileBuffer
		
	Returns
		Object
			Number pat
			Number pmt
*/
NAN_METHOD(FindLastPatPmtPackets) {
	NanScope();

	if (args.Length() < 1) 
	{
		return NanThrowTypeError("Function requires 1 argument");
	}
	
	// validate source buffer
	if (!args[0]->IsObject())
	{
		return NanThrowTypeError("Argument 1 must be a buffer");
	}
	
	Local<Object> bufferObject = args[0]->ToObject();
	if (!Buffer::HasInstance(bufferObject))
	{
		return NanThrowTypeError("Argument 1 must be a buffer");
	}
	
	byte_t* sourceBuffer = (byte_t*)Buffer::Data(bufferObject);
	byte_t* lastPatPacket;
	byte_t* lastPmtPacket;
	
	if (!find_last_pat_pmt_packets(
		sourceBuffer,
		Buffer::Length(bufferObject),
		&lastPatPacket, 
		&lastPmtPacket))
	{
		NanReturnNull();
	}
	
	Local<Object> result = Object::New();
	result->Set(String::NewSymbol("pat"), Number::New(lastPatPacket - sourceBuffer));
	result->Set(String::NewSymbol("pmt"), Number::New(lastPmtPacket - sourceBuffer));
	
	NanReturnValue(result);
}

static void 
FreePartsArray(ts_preparer_part_t* parts, size_t partsCount)
{
	for (size_t i = 0; i < partsCount; i++)
	{
		free(parts[i].buffers);
	}
	free(parts);
}

/*
	Parameters
		Array<Object> parts
			Array<Buffer> buffers
			Buffer frames
			Number framesPosShift
			Number flags
		
	Returns
		Object
			Buffer metadata
			Buffer header
			Buffer data
*/
NAN_METHOD(PrepareTs) {
	NanScope();
	
	if (args.Length() < 1) 
	{
		return NanThrowTypeError("Function requires one argument");
	}
	
	// validate frames info
	if (!args[0]->IsArray())
	{
		return NanThrowTypeError("Argument 1 must be an array");
	}
	
	Local<Array> partsArray = args[0].As<Array>();
	size_t partsCount = partsArray->Length();
	if (partsCount < 1)
	{
		return NanThrowTypeError("Part array cannot be empty");
	}
	
	ts_preparer_part_t* parts = (ts_preparer_part_t*)malloc(sizeof(parts[0]) * partsCount);
	if (parts == NULL)
	{
		return NanThrowError("Failed to allocate parts array");
	}
	
	memset(parts, 0, sizeof(parts[0]) * partsCount);
	
	for (size_t i = 0; i < partsCount; i++)
	{
		if (!partsArray->Get(i)->IsObject())
		{
			FreePartsArray(parts, partsCount);
			return NanThrowTypeError("Parts array must contain objects");
		}
		
		Local<Object> curObject = partsArray->Get(i)->ToObject();

		// buffers
		Local<Value> buffers = curObject->Get(String::NewSymbol("buffers"));
		parts[i].buffers = ParseArrayOfBuffers(buffers, &parts[i].buffer_count);
		if (parts[i].buffers == NULL)
		{
			FreePartsArray(parts, partsCount);
			return NanThrowTypeError("Each part must contain a non-empty array of buffers");
		}
		
		// frames
		Local<Value> frames = curObject->Get(String::NewSymbol("frames"));
		if (!frames->IsObject())
		{
			FreePartsArray(parts, partsCount);
			return NanThrowTypeError("Each part must contain a frames buffer");
		}
		
		Local<Object> framesBuffer = frames->ToObject();
		if (!Buffer::HasInstance(framesBuffer))
		{
			FreePartsArray(parts, partsCount);
			return NanThrowTypeError("Each part must contain a frames buffer");
		}

		parts[i].frames = (frame_info_t*)Buffer::Data(framesBuffer);
		parts[i].frame_count = Buffer::Length(framesBuffer) / sizeof(frame_info_t);
		
		// framesPosShift
		Local<Value> framesPosShift = curObject->Get(String::NewSymbol("framesPosShift"));
		if (!framesPosShift->IsNumber()) 
		{
			FreePartsArray(parts, partsCount);
			return NanThrowTypeError("Each part must contain a framesPosShift number");
		}

		parts[i].frames_pos_shift = framesPosShift->Int32Value();
		
		// flags
		Local<Value> flags = curObject->Get(String::NewSymbol("flags"));
		if (!flags->IsNumber()) 
		{
			FreePartsArray(parts, partsCount);
			return NanThrowTypeError("Each part must contain a flags number");
		}

		parts[i].flags = flags->Int32Value();
	}
	
	dynamic_buffer_t outputMetadata;
	dynamic_buffer_t outputHeader;
	dynamic_buffer_t outputData;
	
	bool_t prepareResult = prepare_ts_data(
		parts,
		partsCount,
		&outputMetadata,
		&outputHeader,
		&outputData);

	FreePartsArray(parts, partsCount);
		
	if (!prepareResult)
	{
		return NanThrowError("Failed to prepare TS data");
	}
	
	Local<Object> metadataBuffer = NanNewBufferHandle((char*)outputMetadata.data, outputMetadata.write_pos);
	Local<Object> headerBuffer = NanNewBufferHandle((char*)outputHeader.data, outputHeader.write_pos);
	Local<Object> dataBuffer = NanNewBufferHandle((char*)outputData.data, outputData.write_pos);
	
	free_buffer(&outputMetadata);
	free_buffer(&outputHeader);
	free_buffer(&outputData);
	
	Local<Object> result = Object::New();	
	result->Set(String::NewSymbol("metadata"), metadataBuffer);
	result->Set(String::NewSymbol("header"), headerBuffer);
	result->Set(String::NewSymbol("data"), dataBuffer);
	
	NanReturnValue(result);
}

/*
	Parameters
		Array<Buffer> fileBuffers
		String framesInfo
		
	Returns
		Buffer
*/
NAN_METHOD(ParseFramesInfo) {
	NanScope();
	
	if (args.Length() < 2) 
	{
		return NanThrowTypeError("Function requires 2 arguments");
	}
	
	// parse arguments
	if (!args[1]->IsString())
	{
		return NanThrowTypeError("Argument 2 must be a string");
	}

	v8::String::Utf8Value framesBuffer(args[1]);

	size_t fileBuffersCount;
	dynamic_buffer_t* fileBuffers = ParseArrayOfBuffers(args[0], &fileBuffersCount);
	if (fileBuffers == NULL)
	{
		return NanThrowTypeError("Argument 1 must be a non-empty array of buffers");
	}
	
	// parse frames text buffer
	frame_info_t* source_frames;
	int source_frame_count;	
	
	if (!get_frames(
		fileBuffers,
		fileBuffersCount,
		*framesBuffer, 
		framesBuffer.length(), 
		&source_frames,
		&source_frame_count, 
		TRUE))
	{
		return NanThrowError("Failed to parse frames info");
	}	
	
	// return the result
	Local<Object> result = NanNewBufferHandle((char*)source_frames, sizeof(frame_info_t) * source_frame_count);

	free(source_frames);
	
	NanReturnValue(result);
}

void init(Handle<Object> exports) 
{
	exports->Set(String::NewSymbol("getCutDetails"), FunctionTemplate::New(GetCutDetails)->GetFunction());
	exports->Set(String::NewSymbol("findLastPatPmtPackets"), FunctionTemplate::New(FindLastPatPmtPackets)->GetFunction());
	exports->Set(String::NewSymbol("prepareTs"), FunctionTemplate::New(PrepareTs)->GetFunction());
	exports->Set(String::NewSymbol("parseFramesInfo"), FunctionTemplate::New(ParseFramesInfo)->GetFunction());
}

NODE_MODULE(TsPreparer, init)
