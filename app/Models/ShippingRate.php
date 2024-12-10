<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingRate extends Model
{
    use HasFactory;

    protected $table = "shipping_rates";
    protected $fillable = [
        'weight_max',
        'weight_min',
        'ncr',
        'luzon',
        'visayas',
        'mindanao',
        'island'
    ];
}
