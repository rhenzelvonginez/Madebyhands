<?php

namespace Database\Factories;

use App\Models\Products;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Products>
 */
class ProductsFactory extends Factory
{
  // protected $model = Products::class;

  public function definition(): array
  {
    return [
      'product_name' => $this->faker->words(3, true),
      'rating' => $this->faker->randomFloat(1, 1, 5), // Ratings are usually from 1 to 5
      'quantity' => $this->faker->numberBetween(1, 100), // Quantity usually starts from 1
      'description' => $this->faker->paragraph(), // More descriptive product description
      'seller_id' => User::inRandomOrder()->first()->id,
      'sold' => $this->faker->numberBetween(0, 1000), // Number of items sold can be higher
      'price' => $this->faker->numberBetween(10, 2000), // More realistic price range
      'category' => \App\Models\Category::inRandomOrder()->first()->category_name,
    ];
  }
}
