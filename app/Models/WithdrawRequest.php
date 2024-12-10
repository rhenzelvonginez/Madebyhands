<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WithdrawRequest extends Model
{
  use HasFactory;

  protected $fillable = [
    'seller_id',
    'amount',
    'status',
    'created_at',
    'updated_at',
    'account_name',
    'payment_method',
    'account_number'
  ];

  public function sellerData()
  {
    return $this->belongsTo(Seller::class, 'seller_id', 'id');
  }
}
