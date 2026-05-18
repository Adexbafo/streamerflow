<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Inertia\Inertia;

class TrendingController extends Controller
{
    /**
     * Display trending videos.
     */
    public function index()
    {
        $videos = Video::with([
                'user',
                'category',
                'likes',
            ])
            ->withCount('likes')
            ->orderByDesc('likes_count')
            ->orderByDesc('views_count')
            ->latest()
            ->paginate(12);

        return Inertia::render('Trending/Index', [
            'videos' => $videos,
        ]);
    }
}