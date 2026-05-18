<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class SavedVideoController extends Controller
{
    /**
     * Display saved videos.
     */
    public function index()
    {
        $savedVideos = auth()->user()
            ->savedVideos()
            ->with('video.user')
            ->latest()
            ->paginate(20);

        return Inertia::render('SavedVideos/Index', [
            'savedVideos' => $savedVideos,
        ]);
    }
}