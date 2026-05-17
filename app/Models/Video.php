<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'description',
        'thumbnail',
        'video_path',
        'video_size',
        'duration',
        'visibility',
        'processing_status',
        'region',
        'language',
        'views_count',
        'likes_count',
        'comments_count',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
{
    return $this->belongsTo(Category::class);
}
}