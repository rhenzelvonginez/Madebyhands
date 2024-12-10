<?php

namespace App\Http\Controllers;

use App\Mail\BillingMail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\CartItem;
use App\Models\Products;
use App\Models\OrderItem;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\SellerProductList;
use App\Http\Resources\ShopProductResource;
use Illuminate\Validation\ValidationException;
use App\Http\Resources\Seller\ViewProductResource;
use App\Http\Resources\SellerProductImageResource;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

class CheckoutController extends Controller
{
    public function show(Request $request)
    {
        $products = [];
        foreach ($request->items as $item) {
            $product = Products::with('seller')
                ->with('images')
                ->where('id', $item['product_id'])
                ->first();


            if ($product) {
                $productsData = [
                    'product' => new ShopProductResource($product),
                    'seller' => $product->seller,
                    'images' => SellerProductImageResource::collection($product->images),
                    'buying_quantity' => $item['item_quantity']
                ];

                if (isset($item['cart_id'])) {
                    $productsData['cart_id'] = $item['cart_id'];
                }

                $products[] = $productsData;
            }
        }

        // dd(new SellerProductList($product));
        return Inertia::render('Shop/Checkout', [
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'phone_no' => 'required|string',
            'address' => 'required|string',
            'total' => 'required|numeric',
            'payment_method' => 'required',
            'items' => 'required|array',
            'items.*.product_id' => 'required|integer',
            'items.*.quantity' => 'required|integer',
            'items.*.price' => 'required|numeric',
            'items.*.shop_name' => 'required|string',
            'items.*.seller_id' => 'required|integer',
            'items.*.product_name' => 'required|string',
            'items.*.category' => 'required|string',
        ]);

        DB::beginTransaction();


        try {

            do {
                $generated_order_id = 'MBH' . strtoupper(Str::random(3)) . Str::random(4) . strtoupper(Str::random(4)) . Str::random(3);
            } while (
                Order::where('order_id', $generated_order_id)->exists()
            );

            $order = Order::create([
                'user_id' => auth()->id(),
                'order_id' => strtoupper($generated_order_id),
                'name' => $request->name,
                'phone_no' => $request->phone_no,
                'address' => $request->address,
                'total' => $request->total,
                'payment_option' => $request->payment_method
            ]);


            $line_items = [];
            $orderItemsList = [];

            foreach ($request->items as $item) {

                do {
                    $generated_order_item_id = 'MBH' . strtoupper(Str::random(1)) . Str::random(2) . strtoupper(Str::random(1)) . Str::random(2);
                } while (
                    OrderItem::where('order_item_id', $generated_order_item_id)->exists()
                );

                $processedOrderItem = OrderItem::create([
                    'order_id' => $order->id,
                    'order_item_id' => strtoupper($generated_order_item_id),
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'seller_id' => $item['seller_id'],
                    'shop_name' => $item['shop_name'],
                    'status' => 'order placed',
                    'product_name' => $item['product_name'],
                    'category' => $item['category'],
                    'amount' => $item['quantity'] * $item['price'],
                    'delivery_address' => $request->address,
                ]);

                $line_items[] = [
                    'name' => $processedOrderItem->product_name,
                    'quantity' => (int) $processedOrderItem->quantity,
                    'amount' => (int) ($processedOrderItem->amount / $processedOrderItem->quantity . '00'),
                    'currency' => 'PHP',
                    'description' => 'Description for ' . $processedOrderItem->product_name,
                ];

                $orderItemsList[] = [
                    'order_item_id' => $processedOrderItem->id,
                ];
            }

            //remove the order from cart if its from cart
            if (isset($request->cart_items)) {
                foreach ($request->cart_items as $item) {
                    CartItem::destroy($item['cart_id']);
                }
            }

            //paymongo api integration
            if ($request->payment_method == 'gcash/paymaya') {

                $client = new Client();
                try {

                    $response = $client->request('POST', 'https://api.paymongo.com/v1/checkout_sessions', [
                        'body' => json_encode([
                            'data' => [
                                'attributes' => [
                                    'billing' => [
                                        'name' => $request->name,
                                        'email' => $request->email,
                                        'phone' => $request->phone_no
                                    ],
                                    'statement_descriptor' => 'Payment for buying an item in MadeByHands.',
                                    'description' => $generated_order_id . ' (Payment for Order No.)',
                                    'line_items' => $line_items,
                                    'reference_number' => $generated_order_id,
                                    'payment_method_types' => ['gcash', 'paymaya'], //payment method here
                                    'success_url' => route('checkout.success', $generated_order_id),
                                    'cancel_url' => $request->current_url,
                                ]
                            ]
                        ]),
                        'headers' => [
                            'Content-Type' => 'application/json',
                            'accept' => 'application/json',
                            'authorization' => 'Basic ' . base64_encode(env('PAYMONGO_SECRET_KEY')),
                        ],
                    ]);


                    $responseBody = $response->getBody()->getContents();
                    $responseData = json_decode($responseBody, true);
                    $checkoutUrl = $responseData['data']['attributes']['checkout_url'];
                    $checkout_session_id = $responseData['data']['id'];

                    foreach ($orderItemsList as $orderItem) {
                        OrderItem::where('id', $orderItem['order_item_id'])
                            ->update([
                                'status' => 'pending',
                                'payment_status' => 'paid',
                                'cs_id' => $checkout_session_id
                            ]);
                    }
                    DB::commit();
                    Mail::to(auth()->user()->email)->send(new BillingMail($line_items, $request->payment_method, $generated_order_id));

                    return Inertia::location($checkoutUrl);
                } catch (\Exception $e) {
                    if ($e instanceof \GuzzleHttp\Exception\ClientException) {
                        $response = $e->getResponse();
                        if ($response) {
                            $body = $response->getBody()->getContents();
                            Log::error('Response body: ' . $body);
                            dd('api error', $body);
                        }
                    }
                    dd('error_api');
                    Log::Error('API Paymongo error:' . $e->getMessage());
                }
            }

            DB::commit();
            Mail::to(auth()->user()->email)->send(new BillingMail($line_items, $request->payment_method, $generated_order_id));
            return to_route('checkout.success', $generated_order_id)->with([
                'status' => 'success',
                'message' => 'Order Placed Successfully'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed: ' . $e->getMessage());

            return to_route('checkout.show')->with([
                'status' => 'error',
                'message' => 'Order placement failed ' . $e->getMessage()
            ]);
        }
    }

    public function successPage(string $orderId)
    {
        $order = Order::where('order_id', $orderId)->with('items')->firstOrFail();
        $categoriesFromOrder = $order->items->pluck('category')->unique();
        $products = Products::with('images')->whereIn('category', $categoriesFromOrder)->limit(10)->get();

        // $client = new Client();

        // $client->request('POST', 'https://api.paymongo.com/v1/checkout_sessions/' . $order->items[0]->cs_id . '/expire', [
        //   'headers' => [
        //     'accept' => 'application/json',
        //     'authorization' => 'Basic ' . base64_encode(env('PAYMONGO_SECRET_KEY')),
        //   ],
        // ]);

        return Inertia::render('Shop/Status/Success', [
            'orderId' => $orderId,
            'products' => ViewProductResource::collection($products)
        ]);
    }









    //end
}
