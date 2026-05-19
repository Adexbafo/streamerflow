<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display homepage videos.
     */
    public function index()
    {
        $videos = Video::with('user')
            ->latest()
            ->get();

        return Inertia::render('Home', [
            'videos' => $videos,
        ]);
    }
}