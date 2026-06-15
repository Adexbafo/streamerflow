<?php

namespace App\Http\Controllers;

use App\Events\ChatMessageSent;
use App\Models\ChatMessage;
use App\Models\Stream;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([

    'stream_id' => ['required', 'exists:streams,id'],

    'message' => ['required', 'string', 'max:500'],

]);

$stream = Stream::findOrFail(
    $request->stream_id
);

        $chatMessage = ChatMessage::create([
            'user_id' => auth()->id(),
            'stream_id' => $stream->id,
            'message' => $request->message,
        ]);

        $chatMessage->load('user');

        $payload = [
            'user' => $chatMessage->user->username,
            'message' => $chatMessage->message,
            'time' => $chatMessage->created_at->format('H:i'),
        ];

        broadcast(
            new ChatMessageSent(
                $payload,
                $stream->id
            )
        )->toOthers();

        return response()->json([
            'message' => $payload,
        ]);
    }
}