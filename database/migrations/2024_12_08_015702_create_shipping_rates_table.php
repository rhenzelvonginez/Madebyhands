<?php

use App\Models\ShippingRate;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shipping_rates', function (Blueprint $table) {
            $table->id();
            $table->float('weight_min', 8, 2);
            $table->float('weight_max', 8, 2);
            $table->integer('ncr');
            $table->integer('luzon');
            $table->integer('visayas');
            $table->integer('mindanao');
            $table->integer('island');
            $table->timestamps();
        });

        $shipping_data = [
            [
                'weight_min' => '0',
                'weight_max' => '0.500',
                'ncr' => '85',
                'luzon' => '95',
                'visayas' => '100',
                'mindanao' => '105',
                'island' => '115',
            ],
            [
                'weight_min' => '0.501',
                'weight_max' => '1',
                'ncr' => '115',
                'luzon' => '165',
                'visayas' => '180',
                'mindanao' => '195',
                'island' => '205',
            ],
            [
                'weight_min' => '1.01',
                'weight_max' => '3',
                'ncr' => '115',
                'luzon' => '190',
                'visayas' => '200',
                'mindanao' => '220',
                'island' => '230',
            ],
            [
                'weight_min' => '3.01',
                'weight_max' => '4',
                'ncr' => '200',
                'luzon' => '280',
                'visayas' => '300',
                'mindanao' => '330',
                'island' => '340',
            ],
            [
                'weight_min' => '4.01',
                'weight_max' => '5',
                'ncr' => '220',
                'luzon' => '320',
                'visayas' => '370',
                'mindanao' => '370',
                'island' => '380',
            ],
            [
                'weight_min' => '5.01',
                'weight_max' => '6',
                'ncr' => '255',
                'luzon' => '375',
                'visayas' => '435',
                'mindanao' => '435',
                'island' => '445',
            ],
            [
                'weight_min' => '6.01',
                'weight_max' => '7',
                'ncr' => '295',
                'luzon' => '435',
                'visayas' => '505',
                'mindanao' => '505',
                'island' => '515',
            ],
            [
                'weight_min' => '7.01',
                'weight_max' => '8',
                'ncr' => '335',
                'luzon' => '495',
                'visayas' => '575',
                'mindanao' => '575',
                'island' => '585',
            ],
            [
                'weight_min' => '8.01',
                'weight_max' => '9',
                'ncr' => '375',
                'luzon' => '555',
                'visayas' => '645',
                'mindanao' => '645',
                'island' => '655',
            ],
            [
                'weight_min' => '9.01',
                'weight_max' => '10',
                'ncr' => '415',
                'luzon' => '615',
                'visayas' => '715',
                'mindanao' => '715',
                'island' => '725',
            ],
        ];

        foreach ($shipping_data as $data) {
            ShippingRate::firstOrCreate($data);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipping_rates');
    }
};
