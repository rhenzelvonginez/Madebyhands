<?php

use App\Models\Products;
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
    Schema::create('products', function (Blueprint $table) {
      $table->id();
      $table->string('product_name');
      $table->float('rating')->default(0);
      $table->bigInteger('sold')->default(0);
      $table->integer('quantity')->unsigned()->default(0);
      $table->integer('price')->unsigned()->default(0);
      $table->string('description');
      $table->boolean('is_verified')->default(0);
      $table->unsignedBigInteger('seller_id');
      $table->foreign('seller_id')->references('id')->on('sellers')->onDelete('cascade');
      $table->string('category');
      $table->timestamps();
    });

    $products = [
      [
        'product_name' => 'Chandelier Shells with lights from Hundred Islands',
        'is_verified' => '1',
        'price' => '1000',
        'rating' => '2',
        'quantity' => '50',
        'seller_id' => '1',
        'description' => 'Chandelier made of Small shells',
        'category' => 'Chandeliers',
        'sold' => '10'
      ],
      [
        'product_name' => 'Shell Clock assorted design',
        'is_verified' => '1',
        'price' => '1200',
        'rating' => '3.5',
        'quantity' => '100',
        'seller_id' => '2',
        'description' => ' - Assorted Clock made of shells
                           - Fout Layers',
        'category' => 'Clocks',
        'sold' => '30'
      ],
      [
        'product_name' => 'Hundred Island Printed T-shirt assorted design',
        'is_verified' => '1',
        'price' => '250',
        'rating' => '4.5',
        'quantity' => '200',
        'seller_id' => '3',
        'description' => ' Assorted specialized Printed T-shirts of Hundred Islands.',
        'category' => 'T-shirts',
        'sold' => '300'
      ],
      [
        'product_name' => 'Bamboo Toys, Furniture & Display',
        'is_verified' => '1',
        'price' => '650',
        'rating' => '4.5',
        'quantity' => '200',
        'seller_id' => '4',
        'description' => ' Toys & Furniture made in bamboo (kawayan)',
        'category' => 'E-Kawayan',
        'sold' => '300'
      ],
      // fake data 
      [
        'product_name' => 'Capiz Shell Wind Chime',
        'is_verified' => '1',
        'price' => 450,
        'rating' => 4.8,
        'quantity' => 30,
        'description' => 'Beautiful wind chime made from Capiz shells.',
        'sold' => 15,
        'seller_id' => 1,
        'category' => 'Shells',
      ],
      [
        'product_name' => 'Handwoven Abaca Bag',
        'is_verified' => '1',
        'price' => 1200,
        'rating' => 4.7,
        'quantity' => 50,
        'description' => 'Eco-friendly bag made from Abaca fibers.',
        'sold' => 25,
        'seller_id' => 2,
        'category' => 'Bags',
      ],
      [
        'product_name' => 'Bamboo Lampshade',
        'is_verified' => '1',
        'price' => 850,
        'rating' => 4.6,
        'quantity' => 40,
        'description' => 'Handcrafted lampshade made from sustainable bamboo.',
        'sold' => 20,
        'seller_id' => 3,
        'category' => 'Lampshades',
      ],
      [
        'product_name' => 'Handpainted Resin Coasters',
        'is_verified' => '1',
        'price' => 650,
        'rating' => 4.9,
        'quantity' => 80,
        'description' => 'Artistic resin coasters with handpainted designs.',
        'sold' => 40,
        'seller_id' => 4,
        'category' => 'Resin',
      ],
      [
        'product_name' => 'Kawayan Toy Jeepney',
        'is_verified' => '1',
        'price' => 500,
        'rating' => 4.7,
        'quantity' => 70,
        'description' => 'Toy jeepney made from bamboo, a popular Filipino icon.',
        'sold' => 35,
        'seller_id' => 1,
        'category' => 'E-Kawayan',
      ],
      [
        'product_name' => 'Shell Keychains Set',
        'is_verified' => '1',
        'price' => 300,
        'rating' => 4.5,
        'quantity' => 150,
        'description' => 'Set of keychains made from polished shells.',
        'sold' => 75,
        'seller_id' => 2,
        'category' => 'Keychains',
      ],
      [
        'product_name' => 'Handcrafted Bamboo Clock',
        'is_verified' => '1',
        'price' => 900,
        'rating' => 4.6,
        'quantity' => 60,
        'description' => 'Unique wall clock made from bamboo.',
        'sold' => 30,
        'seller_id' => 3,
        'category' => 'Clocks',
      ],
      [
        'product_name' => 'Handwoven Sinamay T-shirt',
        'is_verified' => '1',
        'price' => 350,
        'rating' => 4.7,
        'quantity' => 100,
        'description' => 'Comfortable T-shirt made from Sinamay fabric.',
        'sold' => 50,
        'seller_id' => 4,
        'category' => 'T-shirts',
      ],
      [
        'product_name' => 'Capiz Shell Chandelier',
        'is_verified' => '1',
        'price' => 3200,
        'rating' => 4.9,
        'quantity' => 15,
        'description' => 'Elegant chandelier made from Capiz shells.',
        'sold' => 8,
        'seller_id' => 1,
        'category' => 'Chandeliers',
      ],
      [
        'product_name' => 'Handcrafted Abaca Wallet',
        'is_verified' => '1',
        'price' => 450,
        'rating' => 4.7,
        'quantity' => 100,
        'description' => 'Stylish wallet made from Abaca fibers.',
        'sold' => 50,
        'seller_id' => 2,
        'category' => 'Accessories',
      ],
      // Continue adding more products below
      [
        'product_name' => 'Handwoven Banig Mat',
        'is_verified' => '1',
        'price' => 950,
        'rating' => 4.8,
        'quantity' => 25,
        'description' => 'Traditional Banig mat made from pandan leaves.',
        'sold' => 12,
        'seller_id' => 3,
        'category' => 'Souvenirs',
      ],
      [
        'product_name' => 'Shell Picture Frame',
        'is_verified' => '1',
        'price' => 400,
        'rating' => 4.5,
        'quantity' => 50,
        'description' => 'Picture frame adorned with seashells.',
        'sold' => 25,
        'seller_id' => 4,
        'category' => 'Shells',
      ],
      [
        'product_name' => 'Bamboo Charcoal Bags',
        'is_verified' => '1',
        'price' => 300,
        'rating' => 4.6,
        'quantity' => 70,
        'description' => 'Eco-friendly bags made from bamboo charcoal.',
        'sold' => 35,
        'seller_id' => 1,
        'category' => 'Bags',
      ],
      [
        'product_name' => 'Handwoven Rattan Lampshade',
        'is_verified' => '1',
        'price' => 1200,
        'rating' => 4.7,
        'quantity' => 30,
        'description' => 'Lampshade made from handwoven rattan.',
        'sold' => 15,
        'seller_id' => 2,
        'category' => 'Lampshades',
      ],
      [
        'product_name' => 'Handcrafted Resin Jewelry',
        'is_verified' => '1',
        'price' => 550,
        'rating' => 4.8,
        'quantity' => 80,
        'description' => 'Beautiful jewelry pieces made from resin.',
        'sold' => 40,
        'seller_id' => 3,
        'category' => 'Resin',
      ],
      [
        'product_name' => 'Kawayan Plant Stand',
        'is_verified' => '1',
        'price' => 750,
        'rating' => 4.6,
        'quantity' => 50,
        'description' => 'Plant stand made from bamboo.',
        'sold' => 25,
        'seller_id' => 4,
        'category' => 'E-Kawayan',
      ],
      [
        'product_name' => 'Shell Earring Set',
        'is_verified' => '1',
        'price' => 350,
        'rating' => 4.5,
        'quantity' => 120,
        'description' => 'Earring set made from small polished shells.',
        'sold' => 60,
        'seller_id' => 1,
        'category' => 'Accessories',
      ],
      [
        'product_name' => 'Handcrafted Capiz Lantern',
        'is_verified' => '1',
        'price' => 1800,
        'rating' => 4.8,
        'quantity' => 20,
        'description' => 'Decorative lantern made from Capiz shells.',
        'sold' => 10,
        'seller_id' => 2,
        'category' => 'Chandeliers',
      ],
      [
        'product_name' => 'Handwoven Bamboo Basket',
        'is_verified' => '1',
        'price' => 550,
        'rating' => 4.7,
        'quantity' => 60,
        'description' => 'Basket made from handwoven bamboo.',
        'sold' => 30,
        'seller_id' => 3,
        'category' => 'Souvenirs',
      ],
      [
        'product_name' => 'Resin Art Wall Clock',
        'is_verified' => '1',
        'price' => 950,
        'rating' => 4.8,
        'quantity' => 25,
        'description' => 'Wall clock featuring unique resin art.',
        'sold' => 12,
        'seller_id' => 4,
        'category' => 'Clocks',
      ],
      [
        'product_name' => 'Handpainted T-shirt',
        'is_verified' => '1',
        'price' => 350,
        'rating' => 4.6,
        'quantity' => 90,
        'description' => 'T-shirt with handpainted Filipino designs.',
        'sold' => 45,
        'seller_id' => 1,
        'category' => 'T-shirts',
      ],
    ];

    foreach ($products as $product) {
      Products::create($product);
    }
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('products');
  }
};
