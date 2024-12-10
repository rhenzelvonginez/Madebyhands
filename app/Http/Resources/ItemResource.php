<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
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
      'id' => $this->id,
      'order_id' => $this->order_id,
      'order_item_id' => $this->order_item_id,
      'product_id' => $this->product_id,
      'quantity' => $this->quantity,
      'price' => $this->price,
      'seller_id' => $this->seller_id,
      'shop_name' => $this->shop_name,
      'product_name' => $this->product_name,
      'category' => $this->category,
      'status' => $this->status,
      'is_preparing' => $this->is_preparing,
      'is_ready_for_pickup' => $this->is_ready_for_pickup,
      'is_picked_up' => $this->is_picked_up,
      'is_in_transit' => $this->is_in_transit,
      'is_out_for_delivery' => $this->is_out_for_delivery,
      'is_delivered' => $this->is_delivered,
      'is_cancelled' => $this->is_cancelled,
      'is_rated' => $this->is_rated,
      'cancelled_reason' => $this->cancelled_reason,
      'shipment_status' => $this->shipment_status,
      'amount' => $this->amount,
      'delivery_address' => $this->delivery_address,
      'tracking_number' => $this->tracking_number,
      'payment_time' => $this->payment_time,
      'ship_time' => $this->ship_time,
      'received_date' => $this->received_date,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
      // 'images' => $this->images
      'images' => ProductImages::collection($this->whenLoaded('images')),
    ];
  }
}
