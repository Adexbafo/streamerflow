<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViewerProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'watch_history_enabled',
        'preferred_language',
        'preferred_region',
        'autoplay_enabled',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}