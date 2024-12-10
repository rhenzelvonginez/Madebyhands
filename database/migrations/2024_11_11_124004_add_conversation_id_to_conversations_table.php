<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('conversations', function (Blueprint $table) {
            $table->string('reference')->unique()->nullable();
        });

        DB::table('conversations')->whereNull('reference')->update([
            'reference' => DB::raw("CONCAT(UUID())") // Correct UUID execution for each row
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('conversations', function (Blueprint $table) {
            // Remove the conversation_id column
            $table->dropColumn('reference');
        });
    }
};
