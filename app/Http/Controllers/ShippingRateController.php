<?php

namespace App\Http\Controllers;

use App\Models\ShippingRate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShippingRateController extends Controller
{
    public function getShippingRates()
    {
        $shipping_rates = ShippingRate::all();
        return Inertia::render('Admin/ShippingRates', [
            'shipping_data' => $shipping_rates
        ]);
    }
    public function updateShippingRate(Request $request, $id)
    {
        $validated = $request->validate([
            'weight_min' => 'required|numeric|min:0',
            'weight_max' => 'required|numeric|min:0|gte:weight_min',
            'ncr' => 'required|numeric|min:0',
            'luzon' => 'required|numeric|min:0',
            'visayas' => 'required|numeric|min:0',
            'mindanao' => 'required|numeric|min:0',
            'island' => 'required|numeric|min:0',
        ]);
    
        $shippingRate = ShippingRate::findOrFail($id);
        $shippingRate->update($validated);
    
        return redirect()->route('admin.get.shipping-rates')->with('success', 'Shipping rate updated successfully.');
    }
    
}
