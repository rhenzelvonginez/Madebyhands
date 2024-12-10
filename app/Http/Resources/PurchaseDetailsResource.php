<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseDetailsResource extends JsonResource
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

      // "id" => $this->id,
      // "user_id" => $this->user_id,
      // "order_id" => $this->order_id,
      // "name" => $this->name,
      // "phone_no" => $this->phone_no,
      // "address" => $this->address,
      // "total" => $this->total,
      // "payment_option" => $this->payment_option,
      // "created_at" => $this->created_at,
      // "updated_at" => $this->updated_at,
      "items" => ItemResource::collection($this->items)

    ];
  }
}
