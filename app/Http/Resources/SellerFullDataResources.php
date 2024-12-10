<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class SellerFullDataResources extends JsonResource
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
      'is_verified' => $this->is_verified,
      'shop_address' => $this->shop_address,
      'shop_name' => $this->shop_name,
      'seller_verified_at' => $this->updated_at,
      'seller_name' => $this->user->first_name . ' ' . $this->user->last_name,
      'seller_address' => $this->user->address,
      'seller_phone_no' => $this->user->phone_no,
      'seller_email' => $this->user->email,
      'seller_profile_picture' => $this->user->profile_picture_path ? Storage::url($this->user->profile_picture_path) : '',
      'seller_created_at' => $this->user->created_at,
    ];
  }
}
