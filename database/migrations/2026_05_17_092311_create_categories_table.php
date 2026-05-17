<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('categories', function (Blueprint $table) {

        $table->id();

        /*
        |--------------------------------------------------------------------------
        | Category Information
        |--------------------------------------------------------------------------
        */

        $table->string('name');

        $table->string('slug')
            ->unique();

        $table->text('description')
            ->nullable();

        /*
        |--------------------------------------------------------------------------
        | Visual Identity
        |--------------------------------------------------------------------------
        */

        $table->string('icon')
            ->nullable();

        /*
        |--------------------------------------------------------------------------
        | Regional Discovery
        |--------------------------------------------------------------------------
        */

        $table->string('region')
            ->nullable();

        /*
        |--------------------------------------------------------------------------
        | Visibility
        |--------------------------------------------------------------------------
        */

        $table->boolean('is_active')
            ->default(true);

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
   {
    Schema::dropIfExists('categories');
   }
};
