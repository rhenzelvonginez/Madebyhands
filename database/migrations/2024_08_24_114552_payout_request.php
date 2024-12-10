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
    Schema::create('payout_requests', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('seller_id');
      $table->decimal('amount', 15, 2);
      $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
      $table->string('reference_number')->unique();
      $table->timestamps();

      $table->foreign('seller_id')->references('id')->on('sellers')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    //
  }
};
