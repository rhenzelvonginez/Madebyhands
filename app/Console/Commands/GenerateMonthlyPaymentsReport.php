<?php

namespace App\Console\Commands;

use App\Models\MonthlySalesReport;
use App\Models\MontlyPaymentsReport;
use App\Models\OrderReceivedReport;
use Carbon\Carbon;
use Illuminate\Console\Command;

class GenerateMonthlyPaymentsReport extends Command
{

  protected $signature = 'app:generate-monthly-payments-report';
  protected $description = 'Generate monthly reports of payments received';

  public function handle()
  {
    $this->info('Generating monthly reports of payments received.....');

    $startDate = Carbon::now()->startOfMonth()->subMonth();
    $endDate = Carbon::now()->subMonth()->endOfMonth();

    $totalPayments = OrderReceivedReport::whereBetween('created_at', [$startDate, $endDate])
      ->sum('amount');

    $totalCount = OrderReceivedReport::whereBetween('created_at', [$startDate, $endDate])
      ->count();


    MontlyPaymentsReport::create([
      'month' => $startDate->format('Y-m'),
      'total_payments' => $totalPayments,
      'payments_count' => $totalCount
    ]);

    $this->info('Monthly payments report generated successfully.');
  }
}
