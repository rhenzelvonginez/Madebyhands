<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
  use HasFactory;

  protected $fillable = [
    'product_id',
    'user_id',
    'review_text',
    'product_quality',
    'seller_service'
  ];

  public function product()
  {
    return $this->belongsTo(Products::class);
  }

  public function user()
  {
    return $this->belongsTo(User::class, 'user_id', 'id');
  }
}
