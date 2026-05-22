<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use App\Models\CreatorProfile;
use App\Models\ViewerProfile;
use App\Enums\UserRole;
use App\Models\Stream;
use Illuminate\Support\Str;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable
{
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $fillable = [
    'name',
    'username',
    'email',
    'password',
    'role',
    'region',
    'language',
];
    protected $hidden = ['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'];
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'two_factor_confirmed_at' => 'datetime',
    ];

    protected static function booted(): void
{
    static::created(function ($user) {

        /*
        |--------------------------------------------------------------------------
        | Create Viewer Profile
        |--------------------------------------------------------------------------
        */

        ViewerProfile::create([
            'user_id' => $user->id,
            'preferred_region' => $user->region,
            'preferred_language' => $user->language,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Create Creator Profile
        |--------------------------------------------------------------------------
        */

        if ($user->role === UserRole::CREATOR->value) {

            CreatorProfile::create([
                'user_id' => $user->id,
                'display_name' => $user->name,
            ]);

        }

        Stream::create([
    'user_id' => $user->id,
    'title' => "{$user->name}'s Stream",
    'stream_key' => Str::random(40),
]);

    });
}

    public function videos()
{
    return $this->hasMany(Video::class);
}

    public function creatorProfile()
{
    return $this->hasOne(CreatorProfile::class);
}

   public function viewerProfile()
{
    return $this->hasOne(ViewerProfile::class);
}
public function comments()
{
    return $this->hasMany(Comment::class);
}
public function likes()
{
    return $this->hasMany(Like::class);
}
public function followers()
{
    return $this->hasMany(Follow::class, 'following_id');
}

public function following()
{
    return $this->hasMany(Follow::class, 'follower_id');
}
public function watchHistory()
{
    return $this->hasMany(WatchHistory::class);
}
public function savedVideos()
{
    return $this->hasMany(SavedVideo::class);
}
public function stream()
{
    return $this->hasOne(Stream::class);
}
public function chatMessages()
{
    return $this->hasMany(ChatMessage::class);
}
}
