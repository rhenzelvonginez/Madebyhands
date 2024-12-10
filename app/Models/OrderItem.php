<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
  use HasFactory;

  protected $fillable = [
    'order_id',
    'product_id',
    'order_item_id',
    'quantity',
    'price',
    'seller_id',
    'shop_name',
    'product_name',
    'category',
    'status',
    'received_date',
    'is_preparing',
    'is_ready_for_pickup',
    'is_picked_up',
    'is_in_transit',
    'is_out_for_delivery',
    'is_delivered',
    'is_cancelled',
    'cancelled_reason',
    'shipment_status',
    'amount',
    'delivery_address',
    'tracking_number',
    'payment_time',
    'ship_time',
    'received_date',
    'is_preparing_date',
    'is_ready_for_pickup_date',
    'is_picked_up_date',
    'is_in_transit_date',
    'is_out_for_delivery_date',
    'is_delivered_date',
    'is_cancelled_date',
    'is_rated',
    'payment_status',
    'cs_id',
  ];

  public function order()
  {
    return $this->belongsTo(Order::class);
  }

  public function seller()
  {
    return $this->belongsTo(Seller::class);
  }

  public function images()
  {
    return $this->hasMany(ProductsImages::class, 'product_id', 'product_id');
  }
}
