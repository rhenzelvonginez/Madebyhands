<?php

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('monthly_sales_reports', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('seller_id');
      $table->decimal('total_sales', 10, 2);
      $table->integer('total_orders');
      $table->date('report_date');
      $table->timestamps();

      $table->foreign('seller_id')->references('id')->on('sellers')->onDelete('cascade');
    });

    $this->monthlySalesReportFakeData();
  }

  private function monthlySalesReportFakeData(): void
  {
    $sellersId = [1, 2, 3, 4];
    $months = [
      '2024-01-30',
      '2024-02-30',
      '2024-03-30',
      '2024-04-30',
      '2024-05-30',
      '2024-06-30',
      '2024-07-30',
      '2024-08-30'
    ];

    foreach ($months as $month) {
      foreach ($sellersId as $id) {
        $endOfTheMonth = Carbon::createFromFormat('Y-m-d', $month)->endOfMonth()->setTime(23, 59, 58);

        DB::table('monthly_sales_reports')->insert([
          'seller_id' => $id,
          'total_sales' => rand(5000, 10000),
          'total_orders' => rand(50, 200),
          'report_date' => $endOfTheMonth,
          'created_at' => $endOfTheMonth,
          'updated_at' => $endOfTheMonth,
        ]);
      }
    }
  }
  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('monthly_sales_reports');
  }
};
