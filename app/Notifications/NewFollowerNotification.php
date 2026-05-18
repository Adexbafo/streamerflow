<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\DatabaseMessage;

class NewFollowerNotification extends Notification
{
    use Queueable;

    public function __construct(
        public $follower
    ) {}

    /**
     * Delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Database payload.
     */
    public function toDatabase(object $notifiable): DatabaseMessage
    {
        return new DatabaseMessage([
            'message' => "{$this->follower->name} followed you.",
            'username' => $this->follower->username,
        ]);
    }
}