<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AddressController extends Controller
{
    public function checkoutChangeAddress(Request $request)
    {
        $addresses = Address::where('user_id', Auth::id())->get();
        // $request->currentUrl
        return Inertia::render('Shop/ChangeAddress', [
            'currentUrl' => $request->currentUrl,
            'addresses' => $addresses
        ]);
    }
}
