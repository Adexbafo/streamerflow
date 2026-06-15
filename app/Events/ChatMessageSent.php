<?php

namespace App\Events;

use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatMessageSent implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public array $message;

    public int $streamId;

    public function __construct(
        array $message,
        int $streamId
    )
    {
        $this->message = $message;

        $this->streamId = $streamId;
    }

    public function broadcastOn(): array
    {
        return [
            new PresenceChannel(
                'stream.' . $this->streamId
            ),
        ];
    }

    public function broadcastAs(): string
    {
        return 'chat.message.sent';
    }

    public function broadcastWith(): array
    {
        return [
            'message' => $this->message,
        ];
    }
}