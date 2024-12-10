<?php

namespace App\Http\Controllers;

use App\Http\Resources\Seller\ViewProductResource;
use App\Models\Category;
use App\Models\MonthlySalesReport;
use App\Models\Products;
use App\Models\Seller;
use Inertia\Inertia;

class MainController extends Controller
{
    public function landingPage()
    {
        $sellerOfTheMonth = MonthlySalesReport::orderBy('total_orders', 'desc')
            ->first();
        if ($sellerOfTheMonth) {

            $sellerOfTheMonthId = $sellerOfTheMonth->seller_id;
        } else {
            $randomSeller = Seller::with('user')
                ->inRandomOrder()
                ->first();

            $sellerOfTheMonthId = $randomSeller->id;
        }

        $seller = Seller::with('user')->where('id', $sellerOfTheMonthId)->first();

        $sellerProducts = Products::with('images')
            ->where('is_verified', 1)
            ->where('seller_id', $seller->id)
            ->take(4)->get();

        // product controller area here
        $query = Products::query();
        if (request('name')) {
            $query->where('product_name', 'like', '%' . request('name') . '%');
        }
        if (request('category') !== 'all') {
            $query->where('category', 'like', '%' . request('category'));
        }
        switch (request('filterProducts')) {
            case 'filterProducts':
                $query->orderBy('created_at', 'asc');
                break;

            case 'top-selling':
                $query->orderBy('sold', 'desc');
                break;

            case 'highest-rating':
                $query->orderBy('rating', 'desc');
                break;

            case 'a-z':
                $query->orderBy('product_name', 'asc');
                break;

            case 'z-a':
                $query->orderBy('product_name', 'desc');
                break;
            case 'price-l-h':
                $query->orderBy('price', 'asc');
                break;
            case 'price-h-l':
                $query->orderBy('price', 'desc');
                break;
        }

        $products = $query->with('images')->paginate(15);
        $categories = Category::all();

        return Inertia::render('Index', [
            'sellerData' => $seller,
            'sellerProducts' => ViewProductResource::collection($sellerProducts),
            'products' => ViewProductResource::collection($products, ),
            'queryParams' => request()->query() ?: null,
            'categories' => $categories
        ]);
    }
}
