<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Stream;



class Clip extends Model
{
    protected $fillable = [

        'user_id',

        'stream_id',

        'title',

        'start_time',

        'end_time',

        'clip_path',

        'thumbnail_path',

    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function stream()
    {
        return $this->belongsTo(Stream::class);
    }
}