<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class AdminResourceOfSellers extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->first_name . ' ' . $this->last_name,
            'email' => $this->email,
            'address' => $this->address,
            'seller_id' => optional($this->seller)->seller_id,
            'status' => optional($this->seller)->is_verified,
            'profile_picture_path' => $this->profile_picture_path ? Storage::url($this->profile_picture_path) : null,
            'created_at' => Carbon::parse($this->created_at)->format('M d, Y'),
        ];
    }
}
