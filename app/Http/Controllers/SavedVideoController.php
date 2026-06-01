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

    public function toggle($videoId)
{
    $user = auth()->user();

    $alreadySaved = $user->savedVideos()
        ->where('video_id', $videoId)
        ->exists();

    if ($alreadySaved) {

        $user->savedVideos()
            ->detach($videoId);

    } else {

        $user->savedVideos()
            ->attach($videoId);

    }

    return back();
}
}