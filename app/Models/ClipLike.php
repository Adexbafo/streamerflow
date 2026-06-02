<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClipLike extends Model
{
    protected $fillable = [

        'user_id',
        'clip_id',

    ];
}