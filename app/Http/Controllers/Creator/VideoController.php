<?php

namespace App\Http\Controllers\Creator;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class VideoController extends Controller
{
    /**
     * Display creator videos.
     */
    public function index()
    {
        $videos = auth()->user()
            ->videos()
            ->latest()
            ->get();

        return Inertia::render('Creator/Videos/Index', [
            'videos' => $videos,
        ]);
    }

    /**
     * Show upload page.
     */
    public function create()
    {
        return Inertia::render('Creator/Videos/Create', [
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store uploaded video.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([

            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'category_id' => [
                'nullable',
                'exists:categories,id',
            ],

            'video' => [
                'required',
                'file',
                'mimetypes:video/mp4,video/webm',
                'max:51200',
            ],

        ]);

        /*
        |--------------------------------------------------------------------------
        | Store Video
        |--------------------------------------------------------------------------
        */

        $videoPath = $request
            ->file('video')
            ->store('videos', 'public');

        /*
        |--------------------------------------------------------------------------
        | Create Video
        |--------------------------------------------------------------------------
        */

        Video::create([

            'user_id' => auth()->id(),

            'category_id' => $validated['category_id'] ?? null,

            'title' => $validated['title'],

            'slug' => Str::slug($validated['title']) . '-' . time(),

            'description' => $validated['description'] ?? null,

            'video_path' => $videoPath,

            'video_size' => $request
                ->file('video')
                ->getSize(),

            'processing_status' => 'pending',

            'visibility' => 'public',

            'region' => auth()->user()->region,

            'language' => auth()->user()->language,

            'published_at' => now(),

        ]);

        return redirect()
            ->route('creator.videos.index')
            ->with('success', 'Video uploaded successfully.');
    }
}