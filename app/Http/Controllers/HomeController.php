<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display public homepage feed.
     */
    public function index()
    {
        $videos = Video::with([
                'user',
                'category',
            ])
            ->where('visibility', 'public')
            ->latest()
            ->paginate(12);

        return Inertia::render('Home', [
            'videos' => $videos,
        ]);
    }
}