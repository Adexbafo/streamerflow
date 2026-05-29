<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Withdrawal;

class WithdrawalController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $withdrawals = Withdrawal::where(

            'user_id',
            $user->id

        )

        ->latest()

        ->get();

        return Inertia::render(

            'Creator/Withdrawals',

            [

                'wallet' => $user->wallet,

                'withdrawals' => $withdrawals,

            ]

        );
    }

    public function store(Request $request)
    {
        $request->validate([

            'amount' => 'required|integer|min:500',

            'account_name' => 'required',

            'account_number' => 'required',

            'bank_name' => 'required',

        ]);

        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | Balance Validation
        |--------------------------------------------------------------------------
        */

        if (

            $user->wallet->balance < $request->amount

        ) {

            return back()->with(

                'error',

                'Insufficient balance.'

            );
        }

        /*
        |--------------------------------------------------------------------------
        | Deduct Wallet
        |--------------------------------------------------------------------------
        */

        $user->wallet->decrement(

            'balance',

            $request->amount

        );

        /*
        |--------------------------------------------------------------------------
        | Create Withdrawal
        |--------------------------------------------------------------------------
        */

        Withdrawal::create([

            'user_id' => $user->id,

            'amount' => $request->amount,

            'method' => 'bank_transfer',

            'account_name' => $request->account_name,

            'account_number' => $request->account_number,

            'bank_name' => $request->bank_name,

            'status' => 'pending',

        ]);

        return back()->with(

            'success',

            'Withdrawal request submitted.'

        );
    }
}