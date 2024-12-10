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
    Schema::create('order_received_report', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('seller_id');
      $table->unsignedBigInteger('buyer_id');
      $table->unsignedBigInteger('order_id');
      $table->unsignedBigInteger('product_id');
      $table->foreign('seller_id')->references('id')->on('sellers')->onDelete('cascade');
      $table->foreign('buyer_id')->references('id')->on('users');
      $table->string('buyers_name');
      $table->foreign('order_id')->references('id')->on('order_items');
      $table->foreign('product_id')->references('id')->on('products');
      $table->string('product_name');
      $table->bigInteger('amount');
      $table->string('reference_number');
      $table->enum('payment_method', ['gcash/paymaya', 'cod'])->default('cod');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('order_received');
  }
};
