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
            $table->dropForeign(['receiver_id']);

            // Add the foreign key with ON DELETE CASCADE
            $table->foreign('receiver_id')
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
            $table->dropForeign(['receiver_id']);

            // Re-add the original foreign key without cascade
            $table->foreign('receiver_id')
                ->references('id')->on('users');
        });
    }
};
