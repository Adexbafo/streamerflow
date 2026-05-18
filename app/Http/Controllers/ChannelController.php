<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class ChannelController extends Controller
{
    /**
     * Display public creator channel.
     */
    public function show(User $user)
    {
        $user->loadCount('followers');
        $videos = $user->videos()
            ->with('category')
            ->latest()
            ->paginate(12);

        return Inertia::render('Channels/Show', [
            'creator' => $user,
            'videos' => $videos,
        ]);
    }
}