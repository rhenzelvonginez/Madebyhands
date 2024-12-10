<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderReceivedReport extends Model
{
  use HasFactory;

  protected $table = 'order_received_report';

  protected $fillable = [
    'seller_id',
    'order_id',
    'buyer_id',
    'buyers_name',
    'product_id',
    'product_name',
    'amount',
    'reference_number',
    'payment_method'
  ];
}
