<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

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
