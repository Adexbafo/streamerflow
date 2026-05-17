<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\Creator\VideoController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', function () {

        $user = auth()->user();

        return match ($user->role) {
            'admin' => redirect('/admin/dashboard'),
            'creator' => redirect('/creator/dashboard'),
            default => redirect('/viewer/dashboard'),
        };

    })->name('dashboard');

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
