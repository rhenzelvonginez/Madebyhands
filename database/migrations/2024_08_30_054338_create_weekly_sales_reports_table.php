<?php

use App\Models\WeeklySalesReport;
use Carbon\Carbon;
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
    Schema::create('weekly_sales_reports', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('seller_id');
      $table->decimal('total_sales', 10, 2);
      $table->integer('total_orders');
      $table->date('report_date');
      $table->timestamps();

      $table->foreign('seller_id')->references('id')->on('sellers')->onDelete('cascade');
    });

    $this->weeklySalesReportDump();
  }

  private function weeklySalesReportDump(): void
  {

    $startDate = Carbon::create(2024, 1, 1)->startOfWeek(Carbon::SUNDAY);
    $endDate = Carbon::create(2024, 9, 8);

    $sellersId = [1, 2, 3, 4];

    $fakeData = [];

    while ($startDate->lessThanOrEqualTo($endDate)) {
      foreach ($sellersId as $seller) {
        $fakeData[] = [
          'seller_id' => $seller,
          'total_sales' => rand(1000, 5000),
          'total_orders' => rand(10, 50),
          'report_date' => $startDate->format('Y-m-d'),
          'created_at' => $startDate->copy()->startOfDay(),
          'updated_at' => $startDate->copy()->startOfDay(),
        ];
      }

      $startDate->addWeek();
    }

    WeeklySalesReport::insert($fakeData);
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('weekly_sales_reports');
  }
};
