<?php

namespace App\Events;

use App\Models\Stream;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ViewerCountUpdated implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public Stream $stream;

    public function __construct(Stream $stream)
    {
        $this->stream = $stream;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('streams'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'viewer.count.updated';
    }
}