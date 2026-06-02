<?php

namespace App\Http\Controllers;

use App\Models\Clip;
use Illuminate\Http\Request;

class ClipLikeController extends Controller
{
    public function toggle(Clip $clip)
    {
        $existingLike = $clip->likes()
            ->where('user_id', auth()->id())
            ->first();

        if ($existingLike) {

            $existingLike->delete();

        } else {

            $clip->likes()->create([
                'user_id' => auth()->id(),
            ]);
        }

        return back();
    }
}