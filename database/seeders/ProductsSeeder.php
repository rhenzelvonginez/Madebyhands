<?php

namespace Database\Seeders;

use App\Models\Products;
use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run()
  {
    Products::factory(50)->create();
  }
}
