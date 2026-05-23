<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stream extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'description',
        'category',
        'thumbnail',
        'status',
        'viewer_count',
        'started_at',
        'ended_at',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
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