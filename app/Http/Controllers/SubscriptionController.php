<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Subscription;
use App\Models\Transaction;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function store(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | Validate Request
        |--------------------------------------------------------------------------
        */

        $request->validate([

            'creator_id' => ['required', 'exists:users,id'],

        ]);

        /*
        |--------------------------------------------------------------------------
        | Get Users
        |--------------------------------------------------------------------------
        */

        $subscriber = $request->user();

        $creator = User::findOrFail(
            $request->creator_id
        );

        /*
        |--------------------------------------------------------------------------
        | Subscription Price
        |--------------------------------------------------------------------------
        */

        $price = 500;

        /*
        |--------------------------------------------------------------------------
        | Check Wallet Balance
        |--------------------------------------------------------------------------
        */

        if (
            $subscriber->wallet->balance < $price
        ) {

            return back()->withErrors([

                'subscription' =>
                    'Insufficient balance.',

            ]);

        }

        /*
        |--------------------------------------------------------------------------
        | Deduct Subscriber Wallet
        |--------------------------------------------------------------------------
        */

        $subscriber->wallet->decrement(
            'balance',
            $price
        );

        /*
        |--------------------------------------------------------------------------
        | Credit Creator Wallet
        |--------------------------------------------------------------------------
        */

        $creator->wallet->increment(
            'balance',
            $price
        );

        $creator->wallet->increment(
            'lifetime_earned',
            $price
        );

        /*
        |--------------------------------------------------------------------------
        | Create Subscription
        |--------------------------------------------------------------------------
        */

        Subscription::create([

            'subscriber_id' => $subscriber->id,

            'creator_id' => $creator->id,

            'amount' => $price,

            'expires_at' => now()->addMonth(),

        ]);

        /*
        |--------------------------------------------------------------------------
        | Create Transaction
        |--------------------------------------------------------------------------
        */

        Transaction::create([

            'sender_id' => $subscriber->id,

            'receiver_id' => $creator->id,

            'amount' => $price,

            'type' => 'subscription',

            'status' => 'completed',

            'reference' =>
                'SUB-' . strtoupper(uniqid()),

        ]);

        /*
        |--------------------------------------------------------------------------
        | Redirect
        |--------------------------------------------------------------------------
        */

        return back()->with(

            'success',

            'Subscription successful.'

        );
    }
}