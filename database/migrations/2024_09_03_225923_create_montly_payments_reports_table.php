<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('montly_payments_reports', function (Blueprint $table) {
      $table->id();
      $table->string('month');
      $table->decimal('total_payments', 15, 2);
      $table->integer('payments_count');
      $table->timestamps();
    });

    $this->createMontlyPaymentReportData();
  }

  public function createMontlyPaymentReportData(): void
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

      DB::table('montly_payments_reports')->insert([
        'month' => $month,
        'total_payments' => rand(5000, 10000),
        'payments_count' => rand(50, 200),
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
    Schema::dropIfExists('montly_payments_reports');
  }
};
