<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Stream;

class StreamWebhookController extends Controller
{
    public function start(Request $request)
    {
        $stream = Stream::where(
            'stream_key',
            $request->stream_key
        )->first();

        if ($stream) {

            $stream->update([
                'status' => 'live',
                'started_at' => now(),
                'is_ingesting' => true,
            ]);

        }

        return response()->json([
            'success' => true,
        ]);
    }

    public function end(Request $request)
    {
        $stream = Stream::where(
            'stream_key',
            $request->stream_key
        )->first();

        if ($stream) {

            $stream->update([
                'status' => 'offline',
                'ended_at' => now(),
                'is_ingesting' => false,
            ]);

        }

        return response()->json([
            'success' => true,
        ]);
    }
}