<?php

namespace App\Http\Controllers;

use App\Models\Clip;
use App\Models\Stream;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Models\Video;


class ClipController extends Controller
{
    /**
     * Create clip from stream.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([

            'video_id' => ['required', 'exists:videos,id'],

            'start_time' => ['required', 'integer', 'min:0'],

            'duration' => ['required', 'integer', 'min:5', 'max:60'],

        ]);

        $video = Video::findOrFail(
            $validated['video_id']
        );
        /*
        |--------------------------------------------------------------------------
        | Source video path
        |--------------------------------------------------------------------------
        */
        $sourcePath = storage_path(
            'app/public/' . $video->video_path
        );

        /*
        |--------------------------------------------------------------------------
        | Generate clip filename
        |--------------------------------------------------------------------------
        */

        $clipFilename =
            Str::uuid() . '.mp4';

        $thumbnailFilename =
            Str::uuid() . '.jpg';

        $clipRelativePath =
            'clips/' . $clipFilename;

        $thumbnailRelativePath =
            'clips/thumbnails/' .
            $thumbnailFilename;

        $clipFullPath = storage_path(
            'app/public/' . $clipRelativePath
        );

        $thumbnailFullPath = storage_path(
            'app/public/' .
            $thumbnailRelativePath
        );

        /*
        |--------------------------------------------------------------------------
        | FFmpeg clip extraction
        |--------------------------------------------------------------------------
        */

        $clipProcess = Process::run([

            'ffmpeg',

            '-i',
            $sourcePath,

            '-ss',
            $validated['start_time'],

            '-t',
            $validated['duration'],

            '-c:v',
            'libx264',

            '-c:a',
            'aac',

            $clipFullPath,

        ]);
        /*
        |--------------------------------------------------------------------------
        | Generate thumbnail
        |--------------------------------------------------------------------------
        */

        $result = Process::run([

            'ffmpeg',

            '-y',

            '-i',
            $clipFullPath,

            '-frames:v',
            '1',

            '-q:v',
            '2',

            $thumbnailFullPath,

        ]);
        /*
        |--------------------------------------------------------------------------
        | Save clip
        |--------------------------------------------------------------------------
        */

        $clip = Clip::create([

            'user_id' => auth()->id(),

            'video_id' => $video->id,

            'title' => 'New Stream Clip',

            'moderation_status' => 'approved',

            'start_time' => $validated['start_time'],

            'end_time' => (
                $validated['start_time'] +
                $validated['duration']
            ),

            'clip_path' => $clipRelativePath,

            'thumbnail_path' =>
                $thumbnailRelativePath,

        ]);

        return redirect()->route(
            'clips.show',
            $clip
        );
    }

    public function index()
{
    $clips = Clip::where(
    'moderation_status',
    'approved'
)
->with([
    'user',
    'video',
    'likes',
])
->withCount('likes')
->orderByDesc('views_count')
->orderByDesc('likes_count')
->latest()
->paginate(12);
    return Inertia::render(
        'Clips/Index',
        [
            'clips' => $clips,
        ]
    );
}

    public function feed()
{
    $clips = Clip::with([
        'user',
        'likes',
    ])
    ->latest()
    ->paginate(20);

    return Inertia::render(
        'Clips/Feed',
        [
            'clips' => $clips,
        ]
    );
}

    /**
     * Show clip page.
     */
    public function show(Clip $clip)
{
    $clip->increment('views_count');

    $clip->load([
        'user',
        'likes',
    ]);

    return Inertia::render(
        'Clips/Show',
        [
            'clip' => $clip,
        ]
    );
}
}