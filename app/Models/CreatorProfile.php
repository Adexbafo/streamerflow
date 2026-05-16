<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreatorProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'display_name',
        'stream_title',
        'category_focus',
        'social_links',
        'monetization_enabled',
        'subscriber_count',
        'total_views',
        'stream_key',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}