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
        Schema::create('clips', function (Blueprint $table) {

    $table->id();

    $table->foreignId('user_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->foreignId('stream_id')
        ->nullable()
        ->constrained()
        ->nullOnDelete();

    $table->foreignId('video_id')
        ->nullable()
        ->constrained()
        ->nullOnDelete();

    $table->string('title');

    $table->integer('start_time');

    $table->integer('end_time');

    $table->string('clip_path');

    $table->string('thumbnail_path')
        ->nullable();

    $table->unsignedBigInteger('views')
        ->default(0);

    $table->timestamps();

});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clips');
    }
};
