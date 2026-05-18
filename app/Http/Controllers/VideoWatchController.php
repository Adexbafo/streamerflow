<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Inertia\Inertia;

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

        /*
        |--------------------------------------------------------------------------
        | Load Relationships
        |--------------------------------------------------------------------------
        */

        $video->load([
            'user',
            'category',
        ]);

        return Inertia::render('Videos/Show', [
            'video' => $video,
        ]);
    }
}