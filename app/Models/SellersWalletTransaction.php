<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SellersWalletTransaction extends Model
{
  use HasFactory;

  protected $table = 'sellers_wallet_transactions';

  protected $fillable = [
    'wallet_id',
    'type',
    'amount',
    'reference_number'
  ];

  public function sellersWallet()
  {
    return $this->belongsTo(SellersWallets::class);
  }
}
