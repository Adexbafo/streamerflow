<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    /**
     * Global platform search.
     */
    public function index(Request $request)
    {
        $query = $request->get('q');

        $videos = Video::with([
                'user',
                'category',
            ])
            ->when($query, function ($builder) use ($query) {

                $builder->where('title', 'LIKE', "%{$query}%")
                    ->orWhere('description', 'LIKE', "%{$query}%");

            })
            ->latest()
            ->paginate(12)
            ->withQueryString();

        $creators = User::where('role', 'creator')
            ->when($query, function ($builder) use ($query) {

                $builder->where('name', 'LIKE', "%{$query}%")
                    ->orWhere('username', 'LIKE', "%{$query}%");

            })
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Search/Index', [
            'query' => $query,
            'videos' => $videos,
            'creators' => $creators,
        ]);
    }
}