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
    Schema::create('viewer_profiles', function (Blueprint $table) {
        $table->id();

        $table->foreignId('user_id')
            ->constrained()
            ->cascadeOnDelete();

        $table->boolean('watch_history_enabled')
            ->default(true);

        $table->string('preferred_language')
            ->nullable();

        $table->string('preferred_region')
            ->nullable();

        $table->boolean('autoplay_enabled')
            ->default(true);

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
{
    Schema::dropIfExists('viewer_profiles');
}
};
