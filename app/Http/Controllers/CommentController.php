<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Store video comment.
     */
    public function store(Request $request, Video $video)
    {
        $validated = $request->validate([

            'body' => [
                'required',
                'string',
                'max:1000',
            ],

        ]);

        $video->comments()->create([

            'user_id' => auth()->id(),

            'body' => $validated['body'],

        ]);

        return back();
    }
}