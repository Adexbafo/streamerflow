<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;



class StreamWentLiveNotification
    extends Notification
    implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public $stream
    ) {}

    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
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

    public function toBroadcast(object $notifiable): BroadcastMessage
{
    return new BroadcastMessage([

        'title' => 'Stream Went Live',

        'message' =>
            $this->stream->user->name .
            ' is now live.',

        'stream_id' => $this->stream->id,

        'type' => 'stream_live',

        'url' => '/streams/' . $this->stream->id,

    ]);
}
}