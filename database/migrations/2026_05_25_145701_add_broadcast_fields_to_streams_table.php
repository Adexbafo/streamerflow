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
        Schema::table('streams', function (Blueprint $table) {

    $table->boolean('is_ingesting')
        ->default(false);

    $table->string('playback_id')
        ->nullable();

    $table->timestamp('ingest_started_at')
        ->nullable();

    $table->timestamp('ingest_ended_at')
        ->nullable();

});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('streams', function (Blueprint $table) {
            //
        });
    }
};
