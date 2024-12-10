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
    Schema::create('montly_new_customers_reports', function (Blueprint $table) {
      $table->id();
      $table->string('month');
      $table->integer('customers_count');
      $table->timestamps();
    });

    $this->monthlyNewCustomersReportFakeData();
  }

  private function monthlyNewCustomersReportFakeData(): void
  {
    $months = [
      '2024-01',
      '2024-02',
      '2024-03',
      '2024-04',
      '2024-05',
      '2024-06',
      '2024-07',
      '2024-08'
    ];

    foreach ($months as $month) {
      $endOfTheMonth = Carbon::createFromFormat('Y-m', $month)->endOfMonth()->setTime(23, 59, 58);

      DB::table('montly_new_customers_reports')->insert([
        'month' => $month,
        'customers_count' => rand(2, 500),
        'created_at' => $endOfTheMonth,
        'updated_at' => $endOfTheMonth,
      ]);
    }
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('montly_new_customers_reports');
  }
};
