<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonthlySalesReport extends Model
{
  use HasFactory;

  protected $fillable = [
    'seller_id',
    'total_sales',
    'total_orders',
    'report_date'
  ];
}
