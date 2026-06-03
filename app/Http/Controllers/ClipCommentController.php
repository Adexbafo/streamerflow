<?php

namespace App\Http\Controllers;

use App\Models\Clip;
use Illuminate\Http\Request;

class ClipCommentController extends Controller
{
    public function store(
        Request $request,
        Clip $clip
    ) {
        $request->validate([
            'body' => ['required', 'string', 'max:500'],
        ]);
        $validated = $request->validate([

            'body' => [
                'required',
                'string',
                'max:1000',
            ],

        ]);

        $clip->comments()->create([

            'user_id' => auth()->id(),

            'body' => $validated['body'],

        ]);

        return back();
    }
}