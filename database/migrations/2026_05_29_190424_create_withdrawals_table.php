<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('withdrawals', function (

            Blueprint $table

        ) {

            $table->id();

            $table->foreignId('user_id')

                ->constrained()

                ->cascadeOnDelete();

            $table->integer('amount');

            $table->string('method');

            $table->string('account_name');

            $table->string('account_number');

            $table->string('bank_name');

            $table->string('status')

                ->default('pending');

            $table->timestamp('processed_at')

                ->nullable();

            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('withdrawals');
    }
};