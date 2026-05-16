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
    Schema::create('creator_profiles', function (Blueprint $table) {
        $table->id();

        $table->foreignId('user_id')
            ->constrained()
            ->cascadeOnDelete();

        $table->string('display_name');

        $table->string('stream_title')->nullable();

        $table->string('category_focus')->nullable();

        $table->json('social_links')->nullable();

        $table->boolean('monetization_enabled')
            ->default(false);

        $table->unsignedBigInteger('subscriber_count')
            ->default(0);

        $table->unsignedBigInteger('total_views')
            ->default(0);

        $table->string('stream_key')
            ->nullable();

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
{
    Schema::dropIfExists('creator_profiles');
}
};
