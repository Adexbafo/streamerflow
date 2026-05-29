<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $fillable = [

        'subscriber_id',

        'creator_id',

        'amount',

        'expires_at',

    ];
}