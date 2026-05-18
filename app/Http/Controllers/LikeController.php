<?php

namespace App\Http\Controllers;

use App\Models\Video;

class LikeController extends Controller
{
    /**
     * Toggle video like.
     */
    public function toggle(Video $video)
    {
        $existingLike = $video->likes()
            ->where('user_id', auth()->id())
            ->first();

        if ($existingLike) {

            $existingLike->delete();

        } else {

            $video->likes()->create([
                'user_id' => auth()->id(),
            ]);

        }

        return back();
    }
}