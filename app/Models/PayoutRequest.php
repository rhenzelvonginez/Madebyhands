<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PayoutRequest extends Model
{
  use HasFactory;

  protected $table = 'payout_requests';

  protected $fillable = [
    'seller_id',
    'amount',
    'status',
    'reference_number',
  ];

  public function seller()
  {
    return $this->belongsTo(Seller::class);
  }
}
