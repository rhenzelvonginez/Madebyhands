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
    Schema::create('order_items', function (Blueprint $table) {
      $table->id();
      $table->foreignId('order_id')->constrained()->onDelete('cascade');
      $table->string('order_item_id');
      $table->foreignId('product_id')->constrained()->onDelete('cascade');
      $table->integer('quantity');
      $table->decimal('price', 8, 2);
      $table->unsignedBigInteger('seller_id');
      $table->foreign('seller_id')->references('id')->on('sellers')->onDelete('cascade');
      $table->string('shop_name');
      $table->string('product_name');
      $table->string('category');
      $table->string('cs_id')->nullable();
      $table->enum('payment_status', ['paid', 'pending'])->default('pending');
      $table->enum('status', ['order placed', 'pending', 'preparing', 'shipped', 'delivered', 'cancelled']);
      $table->boolean('is_preparing')->default(false);
      $table->boolean('is_ready_for_pickup')->default(false);
      $table->boolean('is_picked_up')->default(false);
      $table->boolean('is_in_transit')->default(false);
      $table->boolean('is_out_for_delivery')->default(false);
      $table->boolean('is_delivered')->default(false);
      $table->boolean('is_cancelled')->default(false);
      $table->timestamp('is_preparing_date')->nullable();
      $table->timestamp('is_ready_for_pickup_date')->nullable();
      $table->timestamp('is_picked_up_date')->nullable();
      $table->timestamp('is_in_transit_date')->nullable();
      $table->timestamp('is_out_for_delivery_date')->nullable();
      $table->timestamp('is_delivered_date')->nullable();
      $table->timestamp('is_cancelled_date')->nullable();
      $table->boolean('is_rated')->default(false);
      $table->string('cancelled_reason')->nullable();
      $table->enum('shipment_status', ['in_transit', 'out_for_delivery', 'delivered', 'failed_attempt'])->nullable();
      $table->decimal('amount');
      $table->string('delivery_address');
      $table->string('tracking_number')->nullable();
      $table->date('payment_time')->nullable();
      $table->date('ship_time')->nullable();
      $table->date('received_date')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('order_items');
  }
};
