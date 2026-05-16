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
    Schema::table('users', function (Blueprint $table) {
        $table->string('username')->unique()->after('name');

        $table->string('role')
            ->default('viewer')
            ->after('email');

        $table->string('avatar')->nullable();
        $table->string('banner')->nullable();

        $table->text('bio')->nullable();

        $table->string('region')->nullable();
        $table->string('language')->nullable();

        $table->boolean('verified')->default(false);

        $table->boolean('is_active')->default(true);

        $table->timestamp('last_seen_at')->nullable();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn([
            'username',
            'role',
            'avatar',
            'banner',
            'bio',
            'region',
            'language',
            'verified',
            'is_active',
            'last_seen_at',
        ]);
    });
}
};
