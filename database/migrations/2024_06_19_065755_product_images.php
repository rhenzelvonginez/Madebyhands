<?php

use App\Models\ProductsImages;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('product_images', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('product_id');
      $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
      $table->string('image_path');
      $table->timestamps();
    });

    $images = [
      [
        'product_id' => '1',
        'image_path' => 'Photos/Product_Photos/Chandelier_01.jpg'
      ],
      [
        'product_id' => '1',
        'image_path' => 'Photos/Product_Photos/Chandelier_02.jpg'
      ],
      [
        'product_id' => '1',
        'image_path' => 'Photos/Product_Photos/Chandelier_03.jpg'
      ],
      [
        'product_id' => '2',
        'image_path' => 'Photos/Product_Photos/Clock_01.jpg'
      ],
      [
        'product_id' => '2',
        'image_path' => 'Photos/Product_Photos/Clock_02.jpg'
      ],
      [
        'product_id' => '2',
        'image_path' => 'Photos/Product_Photos/Clock_03.jpg'
      ],
      [
        'product_id' => '2',
        'image_path' => 'Photos/Product_Photos/Clock_04.jpg'
      ],
      [
        'product_id' => '2',
        'image_path' => 'Photos/Product_Photos/Clock_05.jpg'
      ],
      [
        'product_id' => '3',
        'image_path' => 'Photos/Product_Photos/T_shirt_01.jpg'
      ],
      [
        'product_id' => '3',
        'image_path' => 'Photos/Product_Photos/T_shirt_02.jpg'
      ],
      [
        'product_id' => '3',
        'image_path' => 'Photos/Product_Photos/T_shirt_03.jpg'
      ],
      [
        'product_id' => '3',
        'image_path' => 'Photos/Product_Photos/T_shirt_04.jpg'
      ],
      [
        'product_id' => '4',
        'image_path' => 'Photos/Product_Photos/E_kawayan_01.jpg'
      ],
      [
        'product_id' => '4',
        'image_path' => 'Photos/Product_Photos/E_kawayan_02.jpg'
      ],
      [
        'product_id' => '4',
        'image_path' => 'Photos/Product_Photos/E_kawayan_03.jpg'
      ],
      [
        'product_id' => '4',
        'image_path' => 'Photos/Product_Photos/E_kawayan_04.jpg'
      ],
      [
        'product_id' => '4',
        'image_path' => 'Photos/Product_Photos/E_kawayan_05.jpg'
      ],
    ];

    for ($i = 5; $i <= 25; $i++) {
      $images[] = [
        'product_id' => $i,
        'image_path' => 'Photos/Product_Photos/Default_Product.svg'
      ];
    }


    foreach ($images as $image) {
      ProductsImages::create($image);
    }

    // for the image to work import Product_Photos in the storage folder
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    //
  }
};
