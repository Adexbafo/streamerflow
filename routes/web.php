<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Creator\VideoController;
use App\Http\Controllers\VideoWatchController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\TrendingController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SavedVideoController;
use App\Http\Controllers\NotificationController;

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

Route::middleware(['auth'])->group(function () {

    Route::post('/videos/{video}/comments', [
    CommentController::class,
    'store',
])->name('comments.store');

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

    /*
    |--------------------------------------------------------------------------
    | Creator Dashboard
    |--------------------------------------------------------------------------
    */

    Route::middleware(['role:creator'])->group(function () {

        Route::get('/creator/videos', [
    VideoController::class,
    'index'
])->name('creator.videos.index');

Route::get('/creator/videos/create', [
    VideoController::class,
    'create'
])->name('creator.videos.create');

Route::post('/creator/videos', [
    VideoController::class,
    'store'
])->name('creator.videos.store');

        Route::get('/creator/dashboard', function () {
            return inertia('Creator/Dashboard');
        })->name('creator.dashboard');

    });

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

        Route::get('/streams/demo', function () {
    return inertia('Streams/Show');
});



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
