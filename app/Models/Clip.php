<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Stream;
use App\Models\ClipLike;
use App\Models\ClipComment;

class Clip extends Model
{
    protected $fillable = [

        'user_id',

        'video_id',

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

    public function video()
    {
        return $this->belongsTo(Video::class);
    }

    public function likes()
    {
        return $this->hasMany(ClipLike::class);
    }

    public function comments()
    {
        return $this->hasMany(ClipComment::class)
            ->latest();
    }
}