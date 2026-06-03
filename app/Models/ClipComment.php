<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClipComment extends Model
{
    protected $fillable = [

        'user_id',
        'clip_id',
        'body',

    ];

    public function user()
    {
        return $this->belongsTo(
            User::class
        );
    }

    public function clip()
    {
        return $this->belongsTo(
            Clip::class
        );
    }
}