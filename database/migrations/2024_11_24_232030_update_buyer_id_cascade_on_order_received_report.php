<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('order_received_report', function (Blueprint $table) {
            // Check if foreign key exists before dropping
            $this->dropForeignIfExists($table, 'buyer_id');
            $this->dropForeignIfExists($table, 'order_id');

            $table->unsignedBigInteger('order_id')->nullable()->change();
            $table->unsignedBigInteger('buyer_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_received_report', function (Blueprint $table) {
            $this->dropForeignIfExists($table, 'buyer_id');
            $this->dropForeignIfExists($table, 'order_id');

            $table->unsignedBigInteger('buyer_id')->nullable(false)->change();
            $table->unsignedBigInteger('order_id')->nullable(false)->change();
        });
    }

    /**
     * Helper function to drop foreign keys if they exist.
     */
    protected function dropForeignIfExists(Blueprint $table, string $column): void
    {
        // Check if foreign key constraint exists
        $foreignKeyName = $this->getForeignKeyName($column);
        $exists = DB::select("SHOW KEYS FROM `order_received_report` WHERE Key_name = ?", [$foreignKeyName]);

        if (!empty($exists)) {
            $table->dropForeign($foreignKeyName);
        }
    }

    /**
     * Get foreign key name based on the column name.
     */
    protected function getForeignKeyName(string $column): string
    {
        return "order_received_report_{$column}_foreign";
    }
};
