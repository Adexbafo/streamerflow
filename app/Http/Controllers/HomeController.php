<?php

namespace App\Http\Controllers;

use App\Models\Video;
use App\Models\Stream;
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

        $liveStreams = Stream::with('user')
            ->where('status', 'live')
            ->latest()
            ->get();

        return Inertia::render('Home', [

    'videos' => $videos,

    'liveStreams' => $liveStreams,

]);
    }
}