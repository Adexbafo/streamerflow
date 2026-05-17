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
    Schema::create('videos', function (Blueprint $table) {

        $table->id();

        /*
        |--------------------------------------------------------------------------
        | Ownership
        |--------------------------------------------------------------------------
        */

        $table->foreignId('user_id')
            ->constrained()
            ->cascadeOnDelete();

        /*
        |--------------------------------------------------------------------------
        | Core Video Information
        |--------------------------------------------------------------------------
        */

        $table->string('title');

        $table->string('slug')
            ->unique();

        $table->longText('description')
            ->nullable();

        /*
        |--------------------------------------------------------------------------
        | Media Storage
        |--------------------------------------------------------------------------
        */

        $table->string('thumbnail')
            ->nullable();

        $table->string('video_path');

        $table->unsignedBigInteger('video_size')
            ->nullable();

        $table->integer('duration')
            ->nullable();

        /*
        |--------------------------------------------------------------------------
        | Video Visibility
        |--------------------------------------------------------------------------
        */

        $table->enum('visibility', [
            'public',
            'private',
            'unlisted',
        ])->default('public');

        /*
        |--------------------------------------------------------------------------
        | Processing Status
        |--------------------------------------------------------------------------
        */

        $table->enum('processing_status', [
            'pending',
            'processing',
            'completed',
            'failed',
        ])->default('pending');

        /*
        |--------------------------------------------------------------------------
        | Regional Discovery
        |--------------------------------------------------------------------------
        */

        $table->string('region')
            ->nullable();

        $table->string('language')
            ->nullable();

        /*
        |--------------------------------------------------------------------------
        | Analytics
        |--------------------------------------------------------------------------
        */

        $table->unsignedBigInteger('views_count')
            ->default(0);

        $table->unsignedBigInteger('likes_count')
            ->default(0);

        $table->unsignedBigInteger('comments_count')
            ->default(0);

        /*
        |--------------------------------------------------------------------------
        | Publishing
        |--------------------------------------------------------------------------
        */

        $table->timestamp('published_at')
            ->nullable();

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
{
    Schema::dropIfExists('videos');
}
};
