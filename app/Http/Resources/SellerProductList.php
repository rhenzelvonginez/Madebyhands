<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SellerProductList extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */

  public static $wrap  = false;
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'product_name' => $this->product_name,
      'rating' => $this->rating,
      'sold' => $this->sold,
      'quantity' => $this->quantity,
      'price' => $this->price,
      'description' => $this->description,
      'is_verified' => $this->is_verified,
      'category' => $this->category,
      'images' =>  SellerProductImageResource::collection($this->images),
      'seller' => new SellerFullDataResources($this->seller),
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}
