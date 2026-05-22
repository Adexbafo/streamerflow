<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stream extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'stream_key',
        'status',
        'category',
        'viewer_count',
        'started_at',
        'ended_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function chatMessages()
{
    return $this->hasMany(ChatMessage::class);
}
}