<?php

namespace App\Http\Controllers;

use App\Http\Resources\MyPurchaseResource;
use App\Http\Resources\PurchaseDetailsResource;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderReceivedReport;
use App\Models\Products;
use App\Models\Review;
use App\Models\SellersWallets;
use App\Models\SellersWalletTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $purchases = Order::with('items.images')
            ->where('user_id', auth()->id())
            ->orderBy('updated_at', 'asc')
            ->get();

        $myReviews = Review::where('user_id', Auth::id())
            ->with('product.images')->get();

        return Inertia::render('Shop/MyPurchases', [
            'purchases' => PurchaseDetailsResource::collection($purchases),
            'myReviews' => MyPurchaseResource::collection($myReviews)
        ]);
    }

    public function orderDetails(string $orderId)
    {

        $data = OrderItem::where('order_item_id', $orderId)->with('order')->first();

        return Inertia::render('Shop/OrderDetails', [
            'data' => $data
        ]);
    }

    public function cancelOrder(Request $request)
    {

        $request->validate([
            'orderId' => 'required|exists:order_items,id',
            "selected_reason" => "required",
            "other_reason" => 'nullable|string|min:2'
        ]);

        DB::beginTransaction();

        try {
            $order = OrderItem::where('id', $request->orderId)->first();

            if ($request->selected_reason == 'others') {
                $order->update([
                    "is_cancelled" => 1,
                    'status' => 'cancelled',
                    'cancelled_reason' => $request->other_reason,
                    'is_cancelled_date' => now()
                ]);
            } else {
                $order->update([
                    "is_cancelled" => 1,
                    'status' => 'cancelled',
                    'cancelled_reason' => $request->selected_reason,
                    'is_cancelled_date' => now()
                ]);
            }


            DB::commit();
            return to_route('user.myPurchases')->with([
                'status' => 'success',
                'message' => 'Order Cancelled Successfully'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('user.myPurchases')->with([
                'status' => 'error',
                'message' => 'Cancelling order, failed!. ' . $e->getMessage()
            ]);
        }
    }

    public function showCancelOrder(string $orderId)
    {
        return Inertia::render('Shop/CancelOrder', [
            'id' => $orderId
        ]);
    }

    public function processOrder(Request $request)
    {
        $item = OrderItem::findOrFail($request->id);
        try {
            DB::beginTransaction();

            $item->update([
                'status' => 'preparing',
                'is_preparing' => true,
                'is_preparing_date' => now()
            ]);
            DB::commit();
            return to_route('seller.shop')->with([
                'status' => 'success',
                'message' => 'Order sent as preparing now.'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('seller.shop')->with([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function processOrderPreparing(Request $request)
    {
        $item = OrderItem::findOrFail($request->id);
        try {
            DB::beginTransaction();

            $item->update([
                'status' => 'preparing',
                'is_preparing' => true,
                'is_ready_for_pickup' => true,
                'is_ready_for_pickup_date' => now()
            ]);
            DB::commit();
            return redirect()->route('seller.shop', [
                'activeProcessingTab' => 'preparing',
                'activeTab' => 'processed',
            ])->with([
                        'status' => 'success',
                        'message' => 'Order sent as for Ready to pickup by courier'
                    ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('seller.shop', [
                'activeProcessingTab' => 'preparing',
                'activeTab' => 'processed',
            ])->with([
                        'status' => 'error',
                        'message' => 'Something went worong. ' . $e->getMessage()
                    ]);
        }
    }

    public function processOrderForPickUp(Request $request)
    {

        try {
            $item = OrderItem::findOrFail($request->id);
            $product = Products::findOrFail($item->product_id);
            DB::beginTransaction();
            $product->update([
                'quantity' => $product->quantity - $item->quantity
            ]);

            $item->update([
                'status' => 'shipped',
                'is_preparing' => true,
                'is_ready_for_pickup' => true,
                'is_picked_up' => true,
                'is_picked_up_date' => now()
            ]);
            DB::commit();
            return redirect()->route('seller.shop', [
                'activeProcessingTab' => 'readyForPickup',
                'activeTab' => 'processed',
            ])->with([
                        'status' => 'success',
                        'message' => 'Order sent as picked up by courier.'
                    ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('seller.shop', [
                'activeProcessingTab' => 'readyForPickup',
                'activeTab' => 'processed',
            ])->with([
                        'status' => 'error',
                        'message' => 'Something went worong. ' . $e->getMessage()
                    ]);
        }
    }

    public function processOrderToReceive(Request $request)
    {
        $item = OrderItem::findOrFail($request->id);
        try {
            DB::beginTransaction();

            $item->update([
                'status' => 'shipped',
                'is_preparing' => true,
                'is_ready_for_pickup' => true,
                'is_picked_up' => true,
                'is_in_transit' => true,
                'is_in_transit_date' => now()
            ]);
            DB::commit();
            return redirect()->route('seller.shop', [
                'activeProcessingTab' => 'forPickUp',
                'activeTab' => 'processed',
            ])->with([
                        'status' => 'success',
                        'message' => 'Order sent as in transit.'
                    ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('seller.shop', [
                'activeProcessingTab' => 'forPickUp',
                'activeTab' => 'processed',
            ])->with([
                        'status' => 'error',
                        'message' => 'Something went worong. ' . $e->getMessage()
                    ]);
        }
    }

    public function processOrderOutForDelivery(Request $request)
    {
        $item = OrderItem::findOrFail($request->id);
        try {
            DB::beginTransaction();

            $item->update([
                'status' => 'shipped',
                'is_preparing' => true,
                'is_ready_for_pickup' => true,
                'is_picked_up' => true,
                'is_in_transit' => true,
                'is_out_for_delivery' => true,
                'is_out_for_delivery_date' => now()
            ]);
            DB::commit();
            return redirect()->route('seller.shop', [
                'activeProcessingTab' => 'forPickUp',
                'activeTab' => 'inTransit',
            ])->with([
                        'status' => 'success',
                        'message' => 'Order sent as out for delivery.'
                    ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('seller.shop', [
                'activeProcessingTab' => 'forPickUp',
                'activeTab' => 'inTransit',
            ])->with([
                        'status' => 'error',
                        'message' => 'Something went worong. ' . $e->getMessage()
                    ]);
        }
    }

    public function processOrderReceived(Request $request)
    {

        try {
            $userID = Auth::id();

            $item = OrderItem::with('order')
                ->where('id', $request->id)
                ->whereHas('order', function ($query) use ($userID) {
                    $query->where('user_id', $userID);
                })
                ->first();
            $product = Products::findOrFail($item->product_id);

            DB::beginTransaction();
            $product->increment('sold');

            $item->update([
                'status' => 'delivered',
                'is_delivered' => true,
                'is_delivered_date' => now(),
                'shipment_status' => 'delivered'
            ]);


            OrderReceivedReport::create([
                'seller_id' => $item->seller_id,
                'order_id' => $item->id,
                'buyer_id' => Auth::id(),
                'buyers_name' => auth()->user()->first_name . ' ' . auth()->user()->last_name,
                'product_id' => $product->id,
                'product_name' => $product->product_name,
                'amount' => $item->amount,
                'reference_number' => $item->order->order_id,
                'payment_method' => $item->order->payment_option,
            ]);

            $wallet = SellersWallets::firstOrCreate(['seller_id' => $item->seller_id]);
            $wallet->increment('balance', $item->amount);

            SellersWalletTransaction::create([
                'wallet_id' => $wallet->id,
                'type' => 'income',
                'amount' => $item->amount,
                'reference_number' => $this->generateWalletTransactionReference(),
            ]);

            DB::commit();
            return redirect()->back()->with([
                'status' => 'success',
                'message' => 'Order received successfully.'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return redirect()->back()
                ->with([
                    'status' => 'error',
                    'message' => 'Something went worong. ' . $e->getMessage()
                ]);
        }
    }

    private function generateWalletTransactionReference($prefix = 'WLT')
    {
        $timestamp = now()->format('YmdHis'); // Current timestamp in YmdHis format
        $randomNumber = mt_rand(1000, 9999);  // Random 4-digit number

        return $prefix . $timestamp . $randomNumber;
    }

    // endline
}
