<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class SellerDataResource extends JsonResource
{
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'first_name' => $this->first_name,
      'last_name' => $this->last_name,
      'address' => $this->address,
      'created_at' => $this->created_at,
      'profile_picture' => $this->profile_picture_path ? Storage::url($this->profile_picture_path) : null,
      'email' => $this->email,
      'phone_no' => $this->phone_no,
      'seller' => [
        'id' => $this->seller->id,
        'seller_id' => $this->seller->seller_id,
        'shop_address' => $this->seller->shop_address,
        'shop_name' => $this->seller->shop_name,
        'years_in_selling' => $this->seller->years_in_selling,
        'shop_picture_path' => $this->seller->shop_picture_path ? Storage::url($this->seller->shop_picture_path) : null,
        'store_name' => $this->seller->store_name,
        'motto' => $this->seller->motto,
        'has_permit' => $this->seller->has_permit,
        'has_DTI' => $this->seller->has_DTI,
        'has_mayors_business_permit' => $this->seller->has_mayors_business_permit,
        'has_paid_organizational_fee' => $this->seller->has_paid_organizational_fee,
        'has_barangay_clearance' => $this->seller->has_barangay_clearance,
        'has_bir' => $this->seller->has_bir,
        'proof_of_membership_path' => $this->seller->proof_of_membership_path ?
          Storage::url($this->seller->proof_of_membership_path) : "",
        'is_verified' => $this->seller->is_verified,
        'verified_at' => $this->seller->verified_at,
        'created_at' => $this->seller->created_at,
        'updated_at' => $this->seller->updated_at,
      ],
    ];
  }
}
