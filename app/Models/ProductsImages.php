<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductsImages extends Model
{
  use HasFactory;
  protected $fillable = ['product_id', 'image_path'];

  protected $table = 'product_images';
  public function product()
  {
    return $this->belongsTo(Products::class, 'id');
  }
}
