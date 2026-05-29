<?php

namespace App\Http\Controllers;

use App\Models\Tip;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TipController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([

            'receiver_id' => ['required', 'exists:users,id'],

            'amount' => ['required', 'integer', 'min:1'],

            'message' => ['nullable', 'string', 'max:300'],

        ]);

        $sender = auth()->user();

        $receiver = User::findOrFail($request->receiver_id);

        /*
        |--------------------------------------------------------------------------
        | Prevent Self Tipping
        |--------------------------------------------------------------------------
        */

        if ($sender->id === $receiver->id) {

            return back()->withErrors([
                'tip' => 'You cannot tip yourself.',
            ]);

        }

        /*
        |--------------------------------------------------------------------------
        | Check Balance
        |--------------------------------------------------------------------------
        */

        if ($sender->wallet->balance < $request->amount) {

            return back()->withErrors([
                'tip' => 'Insufficient balance.',
            ]);

        }

        DB::transaction(function () use (
            $sender,
            $receiver,
            $request
        ) {

            /*
            |--------------------------------------------------------------------------
            | Deduct Sender
            |--------------------------------------------------------------------------
            */

            $sender->wallet->decrement(
                'balance',
                $request->amount
            );

            /*
            |--------------------------------------------------------------------------
            | Credit Receiver
            |--------------------------------------------------------------------------
            */

            $receiver->wallet->increment(
                'balance',
                $request->amount
            );

            $receiver->wallet->increment(
                'lifetime_earned',
                $request->amount
            );

            

            /*
            |--------------------------------------------------------------------------
            | Create Tip
            |--------------------------------------------------------------------------
            */

            $sender = auth()->user();

            $receiver = User::find($request->receiver_id);

            $stream = $receiver->stream;
            
            Tip::create([
                'stream_id' => $stream->id,
                'sender_id' => $sender->id,
                'receiver_id' => $receiver->id,
                'amount' => $request->amount,
                'message' => $request->message,
            ]);

             

            /*
            |--------------------------------------------------------------------------
            | Create Transaction
            |--------------------------------------------------------------------------
            */

            Transaction::create([

                'reference' => Str::uuid(),

                'sender_id' => $sender->id,

                'receiver_id' => $receiver->id,

                'amount' => $request->amount,

                'type' => 'tip',

                'status' => 'completed',

            ]);

        });

        return back()->with([
            'success' => 'Tip sent successfully.',
            'tip_activity' => [
                'sender' => $sender->username,
                'amount' => $request->amount,
                'message' => $request->message,
            ],
        ]);
        
    }
}