<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SellersWallets extends Model
{
  use HasFactory;

  protected $table = 'sellers_wallets';

  protected $fillable = [
    'seller_id',
    'balance'
  ];

  public function walletTransactions()
  {
    return  $this->hasMany(SellersWalletTransaction::class, 'wallet_id');
  }
}
