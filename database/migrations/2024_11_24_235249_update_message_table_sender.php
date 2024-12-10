<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('messages', function (Blueprint $table) {
            // Drop the existing foreign key
            $table->dropForeign(['sender_id']);

            // Add the foreign key with ON DELETE CASCADE
            $table->foreign('sender_id')
                ->references('id')->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('messages', function (Blueprint $table) {
            // Drop the cascade foreign key
            $table->dropForeign(['sender_id']);

            // Re-add the original foreign key without cascade
            $table->foreign('sender_id')
                ->references('id')->on('users');
        });
    }
};
