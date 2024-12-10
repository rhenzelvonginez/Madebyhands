<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartItemsResource;
use App\Models\CartItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CartController extends Controller
{
  public function currentCartList(Request $request)
  {
    $currentUser = $request->user();
    $cartsItem = CartItem::where('user_id', $currentUser->id)
      ->with('product.images')
      ->orderBy('created_at', 'desc')
      ->get();
    return Inertia::render('Shop/Cart', [
      'list' => CartItemsResource::collection($cartsItem)
    ]);
  }

  public function addToCart(Request $request)
  {
    $request->validate([
      'product_id' => 'required|exists:products,id',
      'quantity' => 'required|integer|min:1'
    ]);

    try {
      CartItem::create([
        'product_id' => $request->product_id,
        'quantity' => $request->quantity,
        'user_id' => auth()->id()
      ]);

      // dd('quantity' . $request->quantity);
      return back()->with('message', 'Item added successfully!');
    } catch (\Exception $e) {
      return response()->json([
        'message' => 'Something went wrong!',
        500
      ]);
    };
  }

  public function cartCount(Request $request)
  {
    $user = $request->user();
    $count = CartItem::where('user_id', $user->id)->count();
    return response()->json(['count' => $count]);
  }

  public function destroy($id)
  {
    try {
      DB::beginTransaction();
      $cartItem = CartItem::where('id', $id)
        ->where('user_id', auth()->id())
        ->firstOrFail();

      $cartItem->delete();
      DB::commit();
      return redirect()->route('user-cart')->with([
        'status' => 'success',
        'message' => 'Item removed successfully!',
      ]);
    } catch (\Exception $e) {
      DB::rollBack();
      return redirect()->route('user-cart')->with([
        'status' => 'error',
        'message' => $e->getMessage(),
      ]);
    }
  }


  // endline here
}
