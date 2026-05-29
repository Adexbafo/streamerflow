<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Withdrawal extends Model
{
    protected $fillable = [

        'user_id',

        'amount',

        'method',

        'account_name',

        'account_number',

        'bank_name',

        'status',

        'processed_at',

    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}