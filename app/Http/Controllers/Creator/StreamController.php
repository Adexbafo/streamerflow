<?php

namespace App\Http\Controllers\Creator;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Events\StreamStatusUpdated;
use App\Events\ViewerCountUpdated;
use Illuminate\Http\Request;

class StreamController extends Controller
{
    /**
     * Show creator stream dashboard.
     */
    public function show()
    {
        $stream = auth()->user()->stream;

        return Inertia::render('Creator/StreamDashboard', [
            'stream' => $stream,
        ]);
    }

    public function start()
{
    $stream = auth()->user()->stream;

    $stream->update([
        'status' => 'live',
        'started_at' => now(),
    ]);

    StreamStatusUpdated::dispatch($stream);

    return back();
}

public function end()
{
    $stream = auth()->user()->stream;

    $stream->update([
        'status' => 'ended',
        'ended_at' => now(),
    ]);

    StreamStatusUpdated::dispatch($stream);

    return back();
}
public function update(Request $request)
{
    $request->validate([
        'title' => ['required', 'string', 'max:255'],
        'category' => ['required', 'string', 'max:255'],
        'description' => ['nullable', 'string'],
    ]);

    $stream = auth()->user()->stream;

    $stream->update([
        'title' => $request->title,
        'category' => $request->category,
        'description' => $request->description,
    ]);

    return back();
}
public function join()
{
    $stream = auth()->user()->stream;

    $stream->increment('viewer_count');

    broadcast(new ViewerCountUpdated($stream))->toOthers();

    return response()->json([
        'viewer_count' => $stream->viewer_count,
    ]);
}

public function leave()
{
    $stream = auth()->user()->stream;

    if ($stream->viewer_count > 0) {
        $stream->decrement('viewer_count');
    }

    broadcast(new ViewerCountUpdated($stream))->toOthers();

    return response()->json([
        'viewer_count' => $stream->viewer_count,
    ]);
}
}