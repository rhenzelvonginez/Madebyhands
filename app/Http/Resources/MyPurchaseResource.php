<?php

namespace App\Http\Resources;

use App\Http\Resources\Seller\ViewProductResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MyPurchaseResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */

  public static $wrap = false;
  public function toArray(Request $request): array
  {
    return [

      "id" => $this->id,
      "product_id" => $this->product_id,
      "user_id" => $this->user_id,
      "review_text" => $this->review_text,
      "product_quality" => $this->product_quality,
      "seller_service" => $this->seller_service,
      "created_at" => $this->created_at,
      "updated_at" => $this->updated_at,
      "product" => new  ViewProductResource($this->product)
    ];
  }
}
