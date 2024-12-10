<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;

Route::middleware('auth:sanctum')->get('/cart-count', [CartController::class, 'cartCount']);
