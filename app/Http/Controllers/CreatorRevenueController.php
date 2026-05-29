<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Tip;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;



class CreatorRevenueController extends Controller
{
    public function index(Request $request)
{
    $user = $request->user();

    $wallet = $user->wallet;


    /*
    |--------------------------------------------------------------------------
    | Recent Tips
    |--------------------------------------------------------------------------
    */

    $recentTips = Tip::where('receiver_id', $user->id)

        ->latest()

        ->take(10)

        ->with('sender')

        ->get();

    /*
    |--------------------------------------------------------------------------
    | Top Supporters
    |--------------------------------------------------------------------------
    */

    $topSupporters = Tip::select(

            'sender_id',

            DB::raw('SUM(amount) as total_tipped')

        )

        ->where('receiver_id', $user->id)

        ->groupBy('sender_id')

        ->with('sender')

        ->orderByDesc('total_tipped')

        ->take(5)

        ->get();

    /*
    |--------------------------------------------------------------------------
    | Transactions
    |--------------------------------------------------------------------------
    */

    $transactions = Transaction::where('receiver_id', $user->id)

        ->latest()

        ->take(15)

        ->with('sender')

        ->get();

    return Inertia::render(

        'Creator/Revenue',

        [

            'wallet' => $wallet,

            'recentTips' => $recentTips,

            'topSupporters' => $topSupporters,

            'transactions' => $transactions,

        ]

    );
}
}