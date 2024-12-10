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
    Schema::create('sellers_wallet_transactions', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('wallet_id');
      $table->enum('type', ['income', 'withdrawal', 'withdraw_revert']);
      $table->decimal('amount', 15, 2);
      $table->string('reference_number'); // For linking to orders, withdrawals, etc.
      $table->timestamps();

      // Foreign key constraint
      $table->foreign('wallet_id')->references('id')->on('sellers_wallets')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('sellers_wallet_transactions');
  }
};
