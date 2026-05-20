<?php

namespace App\Http\Controllers\Creator;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

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

    return back();
}

public function end()
{
    $stream = auth()->user()->stream;

    $stream->update([
        'status' => 'ended',
        'ended_at' => now(),
    ]);

    return back();
}
}