<?php

use App\Http\Controllers\ChannelController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Creator\StreamController;
use App\Http\Controllers\Creator\VideoController;
use App\Http\Controllers\CreatorRevenueController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SavedVideoController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\TipController;
use App\Http\Controllers\TrendingController;
use App\Http\Controllers\VideoWatchController;
use App\Http\Controllers\WithdrawalController;
use App\Models\Stream;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClipController;


Route::get('/', function () {

    if (auth()->check()) {
        return app(HomeController::class)->index();
    }

    return inertia('welcome');

})->name('home');

Route::get('/trending', [
    TrendingController::class,
    'index',
])->name('trending');

Route::get('/search', [
    SearchController::class,
    'index',
])->name('search');

Route::get('/channels/{user:username}', [
    ChannelController::class,
    'show',
])->name('channels.show');

Route::get('/videos/{video:slug}', [
    VideoWatchController::class,
    'show',
])->name('videos.show');

Route::get('/streams/{stream:slug}', function (Stream $stream) {

    $stream->load('user');

    return inertia('Streams/Show', [

        'stream' => $stream,

        'streamConfig' => [

            'hlsPlaybackUrl' => config('streaming.hls.playback_url'),

            'rtmpServer' => config('streaming.rtmp.server'),

        ],

    ]);

});

Route::get(
    '/clips',
    [ClipController::class, 'index']
)->name('clips.index');

Route::middleware(['auth'])->group(function () {

    Route::post(
        '/clips/create',
        [ClipController::class, 'store']
    )->name('clips.store');

    Route::get(
        '/clips/{clip}',
        [ClipController::class, 'show']
    )->name('clips.show');

    Route::get('/creator/revenue', [

        CreatorRevenueController::class,
        'index',

    ])->name('creator.revenue');

    Route::post('/videos/{video}/comments', [
        CommentController::class,
        'store',
    ])->name('comments.store');

    Route::get('/streams/{stream}', [StreamController::class, 'show']);

    Route::post('/chat/send', [
        ChatController::class,
        'store',
    ]);

    Route::post('/tips', [TipController::class, 'store'])
        ->name('tips.store');

    Route::post('/streams/{stream}/tip', [
        TipController::class,
        'store',
    ])->name('streams.tip');

    Route::post('/videos/{video}/like', [
        LikeController::class,
        'toggle',
    ])->name('videos.like');

    Route::get('/dashboard', function () {
        return redirect('/');
    })->middleware(['auth'])->name('dashboard');

    Route::post('/channels/{user}/follow', [
        FollowController::class,
        'toggle',
    ])->name('channels.follow');

    Route::post('/videos/{video}/save', [
        SavedVideoController::class,
        'toggle',
    ])->name('videos.save');

    Route::get('/saved-videos', [
        SavedVideoController::class,
        'index',
    ])->name('saved-videos.index');

    Route::get('/notifications', [
        NotificationController::class,
        'index',
    ])->name('notifications.index');

    Route::post(
        '/notifications/read-all',
        [NotificationController::class, 'markAllAsRead']
    )->name('notifications.read-all');

    Route::get('/streams/{stream}/messages', function (Stream $stream) {

        return $stream->chatMessages()
            ->latest()
            ->take(50)
            ->with('user')
            ->get()
            ->reverse()
            ->values()
            ->map(function ($message) {

                return [
                    'user' => $message->user->username,
                    'message' => $message->message,
                    'time' => $message->created_at->format('H:i'),
                ];

            });

    });

    Route::post(
        '/subscribe',
        [SubscriptionController::class, 'store']
    )->middleware('auth');

    /*
    |--------------------------------------------------------------------------
    | Creator Dashboard
    |--------------------------------------------------------------------------
    */

    Route::middleware(['role:creator'])->group(function () {

        Route::get('/creator/videos', [
            VideoController::class,
            'index',
        ])->name('creator.videos.index');

        Route::get('/creator/videos/create', [
            VideoController::class,
            'create',
        ])->name('creator.videos.create');

        Route::post('/creator/videos', [
            VideoController::class,
            'store',
        ])->name('creator.videos.store');
        Route::post('/creator/stream', [
            StreamController::class,
            'update',
        ])->name('creator.stream.update');
        Route::get('/creator/dashboard', function () {
            return inertia('Creator/Dashboard');
        })->name('creator.dashboard');

        Route::get('/creator/stream', [
            StreamController::class,
            'show',
        ])->name('creator.stream');

        Route::post('/creator/stream/start', [
            StreamController::class,
            'start',
        ])->name('creator.stream.start');

        Route::post('/creator/stream/end', [
            StreamController::class,
            'end',
        ])->name('creator.stream.end');

        Route::post('/creator/stream/ingest/start', [
            StreamController::class,
            'startIngest',
        ]);

        Route::post('/creator/stream/ingest/stop', [
            StreamController::class,
            'stopIngest',
        ]);

    });

    Route::get(

        '/creator/withdrawals',

        [WithdrawalController::class, 'index']

    )->name('creator.withdrawals');

    Route::post(

        '/withdrawals',

        [WithdrawalController::class, 'store']

    )->name('withdrawals.store');

    /*
    |--------------------------------------------------------------------------
    | Viewer Dashboard
    |--------------------------------------------------------------------------
    */

    Route::middleware(['role:viewer'])->group(function () {

        Route::get('/viewer/dashboard', function () {
            return inertia('Viewer/Dashboard');
        })->name('viewer.dashboard');

    });

    Route::post('/creator/stream/join', [
        StreamController::class,
        'join',
    ]);

    Route::post('/creator/stream/leave', [
        StreamController::class,
        'leave',
    ]);

    Route::get('/streams/{stream}', [StreamController::class, 'publicShow']);

    /*
    |--------------------------------------------------------------------------
    | Admin Dashboard
    |--------------------------------------------------------------------------
    */

    Route::middleware(['role:admin'])->group(function () {

        Route::get('/admin/dashboard', function () {
            return inertia('Admin/Dashboard');
        })->name('admin.dashboard');

    });

});

require __DIR__.'/settings.php';
