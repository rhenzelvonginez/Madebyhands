<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShopProductResource extends JsonResource
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
            'product_name' => $this->product_name,
            'rating' => $this->rating,
            'sold' => $this->sold,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'weight' => $this->weight,
            'description' => $this->description,
            'is_verified' => $this->is_verified,
            'category' => $this->category,
            'type' => $this->type,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
