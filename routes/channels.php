<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('stream.{id}', function ($user, $id) {

    return [
        'id' => $user->id,
        'name' => $user->username,
    ];

});