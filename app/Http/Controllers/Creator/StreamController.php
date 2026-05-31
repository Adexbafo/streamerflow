<?php

namespace App\Http\Controllers\Creator;

use App\Events\StreamStatusUpdated;
use App\Events\ViewerCountUpdated;
use App\Http\Controllers\Controller;
use App\Models\Stream;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Notifications\StreamWentLiveNotification;
use App\Models\User;

class StreamController extends Controller
{
    /**
     * Show creator stream dashboard.
     */
    public function show()
    {
        $stream = Stream::first();

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

        $users = User::where('id', '!=', auth()->id())->get();

        foreach ($users as $user) {

            $user->notify(
                new StreamWentLiveNotification($stream)
        );

}

        StreamStatusUpdated::dispatch($stream);

        return redirect()->back();
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
        $stream = Stream::first();

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'thumbnail' => ['nullable', 'image'],
        ]);

        if ($request->hasFile('thumbnail')) {

            $path = $request->file('thumbnail')
                ->store('thumbnails', 'public');

            $data['thumbnail'] = $path;

        }

        $stream->update($data);

        return redirect()->back();
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

    public function startIngest()
    {
        $stream = Stream::first();

        $stream->update([

            'is_ingesting' => true,

            'ingest_started_at' => now(),

            'playback_id' => 'playback_'.uniqid(),

        ]);

        return redirect()->route('creator.stream');
    }

    public function stopIngest()
    {
        $stream = Stream::first();

        $stream->update([

            'is_ingesting' => false,

            'ingest_ended_at' => now(),

        ]);

        return redirect()->route('creator.stream');
    }

    public function publicShow(Stream $stream)
    {
        $stream->load('user');

        return Inertia::render('Streams/Show', [
            'stream' => $stream,
            'streamConfig' => [
                'hlsPlaybackUrl' =>
                'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
            ],
        ]);
    }
}
