<?php

namespace App\Http\Resources;

use App\Http\Resources\Seller\ViewProductResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartItemsResource extends JsonResource
{
  public static $wrap = false;
  public function toArray(Request $request): array
  {
    return [

      "id" => $this->id,
      "user_id" => $this->user_id,
      "product_id" => $this->product_id,
      "quantity" => $this->quantity,
      "created_at" => $this->created_at,
      "updated_at" => $this->updated_at,
      "product" => new ViewProductResource($this->product)

    ];
  }
}
