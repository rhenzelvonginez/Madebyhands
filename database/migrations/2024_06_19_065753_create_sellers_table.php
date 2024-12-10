<?php

use App\Models\Seller;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sellers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('shop_address')->nullable();
            $table->string('shop_name')->nullable();
            $table->string('years_in_selling');
            $table->string('shop_picture_path')->nullable();
            $table->string('store_name')->nullable();
            $table->boolean('has_permit');
            $table->boolean('has_DTI');
            $table->boolean('has_mayors_business_permit');
            $table->boolean('has_paid_organizational_fee');
            $table->boolean('has_barangay_clearance');
            $table->boolean('has_bir');
            $table->boolean('is_verified')->default(false);
            $table->date("verified_at")->nullable();
            $table->timestamps();
        });

        $sellers = [
            [
                'user_id' => 2,
                'shop_address' => 'Lucap Wharf, Alaminos City, Pangasinan',
                'shop_name' => 'RV Souvenirs',
                'years_in_selling' => 'below 11 months',
                'has_permit' => '1',
                'has_DTI' => '1',
                'has_mayors_business_permit' => '1',
                'has_paid_organizational_fee' => '1',
                'has_barangay_clearance' => '1',
                'has_bir' => '1',
                'proof_of_membership_path' => '',
                'is_verified' => '1'
            ],
            [
                'user_id' => 3,
                'shop_address' => 'Lucap Wharf, Alaminos City, Pangasinan',
                'shop_name' => 'Chell & Shell Craft',
                'years_in_selling' => 'below 11 months',
                'has_permit' => '1',
                'has_DTI' => '1',
                'has_mayors_business_permit' => '1',
                'has_paid_organizational_fee' => '1',
                'has_barangay_clearance' => '1',
                'has_bir' => '1',
                'proof_of_membership_path' => '',
                'is_verified' => '1'
            ],
            [
                'user_id' => 4,
                'shop_address' => 'Lucap Wharf, Alaminos City, Pangasinan',
                'shop_name' => 'MJ\'s PrintedClothing',
                'years_in_selling' => 'below 11 months',
                'has_permit' => '1',
                'has_DTI' => '1',
                'has_mayors_business_permit' => '1',
                'has_paid_organizational_fee' => '1',
                'has_barangay_clearance' => '1',
                'has_bir' => '1',
                'proof_of_membership_path' => '',
                'is_verified' => '1'
            ],
            [
                'user_id' => 5,
                'shop_address' => 'Lucap Wharf, Alaminos City, Pangasinan',
                'shop_name' => 'JohnBoo',
                'years_in_selling' => 'below 11 months',
                'has_permit' => '1',
                'has_DTI' => '1',
                'has_mayors_business_permit' => '1',
                'has_paid_organizational_fee' => '1',
                'has_barangay_clearance' => '1',
                'has_bir' => '1',
                'proof_of_membership_path' => '',
                'is_verified' => '1'
            ]
        ];

        foreach ($sellers as $seller) {
            Seller::create($seller);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sellers');
    }
};
