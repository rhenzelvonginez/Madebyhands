<?php

namespace App\Http\Controllers;

use App\Http\Resources\ItemResource;
use App\Models\OrderItem;
use App\Models\Products;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ReviewController extends Controller
{
  public function getRatePage(string $orderId)
  {
    $authId = Auth::id();
    $order = OrderItem::where('order_item_id', $orderId)
      ->with('images', 'order')
      ->first();
    if ($order->order->user_id !== $authId) {
      return abort(403, 'You are not authorized to this page, contact dev');
    } else {
      return Inertia::render('Shop/WriteReview', [
        'item' =>  new ItemResource($order)
      ]);
    }
  }

  public function creatReview(Request $request)
  {
    $request->validate(
      [
        "review" => 'required|min:10|string',
        "orderId" => 'required',
        "qualityRating" => 'min:1|integer|max:5',
        "serviceRating" => 'min:1|integer|max:5',
      ]
    );

    try {
      DB::beginTransaction();
      $order = OrderItem::findOrFail($request->orderId);
      $order->update(['is_rated' => true]);

      $product = Products::findOrFail($order->product_id);

      $existingReviews = Review::where('product_id', $product->id)->get();
      $existingRatingsCount = $existingReviews->count();
      $existingRatingsSum = $existingReviews->sum('product_quality');

      $newRating = $request->qualityRating;
      $newRatingsCount = $existingRatingsCount + 1;
      $newRatingsSum = $existingRatingsSum + $newRating;
      $newAverageRating = $newRatingsSum / $newRatingsCount;


      $product->update([
        'rating' => $newAverageRating,
      ]);

      Review::create([
        'product_id' => $product->id,
        'user_id' => Auth::id(),
        'review_text' => $request->review,
        'product_quality' => $request->qualityRating,
        'seller_service' => $request->serviceRating
      ]);
      DB::commit();

      return redirect()->route('user.myPurchases', ['activeTab' => 'toRate'])
        ->with([
          'status' => 'success',
          'message' => 'Review submitted successfully!'
        ]);
    } catch (\Exception $e) {
      DB::rollBack();
      Log::error($e->getMessage());
      return redirect()->back()
        ->with([
          'status' => 'error',
          'message' => 'Error:' . $e->getMessage()
        ]);
    }
  }

  //endline
}
