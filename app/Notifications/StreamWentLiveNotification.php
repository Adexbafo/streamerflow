<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class StreamWentLiveNotification extends Notification
{
    use Queueable;

    public function __construct(
        public $stream
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
    'title' => 'Stream Went Live',
    'message' => $this->stream->user->name . ' is now live.',
    'stream_id' => $this->stream->id,
    'type' => 'stream_live',
    'url' => '/streams/' . $this->stream->id,
];
    }
}