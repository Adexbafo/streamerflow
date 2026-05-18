<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Inertia\Inertia;
use App\Models\WatchHistory;

class VideoWatchController extends Controller
{
    /**
     * Display public watch page.
     */
    public function show(Video $video)
    {
        /*
        |--------------------------------------------------------------------------
        | Increment Views
        |--------------------------------------------------------------------------
        */

        $video->increment('views_count');

        if (auth()->check()) {

    WatchHistory::updateOrCreate(

        [
            'user_id' => auth()->id(),
            'video_id' => $video->id,
        ],

        [
            'watched_at' => now(),
        ]

    );

}

        /*
        |--------------------------------------------------------------------------
        | Load Relationships
        |--------------------------------------------------------------------------
        */

        $video->load([
            'user',
            'category',
            'comments.user',
            'likes',
            'savedByUsers',
        ]);

        return Inertia::render('Videos/Show', [
            'video' => $video,
        ]);
    }
}