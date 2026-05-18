<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\User;
use App\Notifications\NewFollowerNotification;

class FollowController extends Controller
{
    /**
     * Toggle creator follow.
     */
    public function toggle(User $user)
    {
        if (auth()->id() === $user->id) {
            return back();
        }

        $existingFollow = Follow::where('follower_id', auth()->id())
            ->where('following_id', $user->id)
            ->first();

        if ($existingFollow) {

            $existingFollow->delete();

        } else {

            Follow::create([
                'follower_id' => auth()->id(),
                'following_id' => $user->id,
            ]);

            $user->notify(
                new NewFollowerNotification(auth()->user())
            );

        }

        return back();
    }
}