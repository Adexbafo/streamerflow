<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use App\Models\CreatorProfile;
use App\Models\ViewerProfile;
use App\Enums\UserRole;
use App\Models\Stream;
use Illuminate\Support\Str;
use App\Models\Wallet;
use App\Models\Transaction;
use App\Models\Tip;
use App\Models\Withdrawal;
use App\Models\Subscription;


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

    'title' => $user->name . "'s Stream",

    'slug' => Str::slug($user->username) . '-live',

    'stream_key' => Str::random(40),

    'status' => 'offline',

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
public function sentTransactions()
{
    return $this->hasMany(Transaction::class, 'sender_id');
}
public function receivedTransactions()
{
    return $this->hasMany(Transaction::class, 'receiver_id');
}
public function sentTips()
{
    return $this->hasMany(Tip::class, 'sender_id');
}
public function receivedTips()
{
    return $this->hasMany(Tip::class, 'receiver_id');
}
public function wallet()
{
    return $this->hasOne(Wallet::class);
}
public function withdrawals()
{
    return $this->hasMany(Withdrawal::class);
}
public function subscriptions()
{
    return $this->hasMany(
        Subscription::class,
        'subscriber_id'
    );
}

public function subscribers()
{
    return $this->hasMany(
        Subscription::class,
        'creator_id'
    );
}
}
