<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'seller_id', 'reason', 'details', 'user_id'];

    public function product()
    {
        return $this->belongsTo(Products::class);
    }

    public function seller()
    {
        return $this->belongsTo(Seller::class, 'seller_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    

}
