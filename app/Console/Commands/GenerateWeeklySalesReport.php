<?php

namespace App\Console\Commands;

use App\Models\MonthlySalesReport;
use App\Models\OrderItem;
use App\Models\Seller;
use App\Models\WeeklySalesReport;
use Carbon\Carbon;
use Illuminate\Console\Command;

class GenerateWeeklySalesReport extends Command
{

  protected $signature = 'app:generate-weekly-sales-report';
  protected $description  = 'Generate weekly sales report for each sellers';

  /**
   * Execute the console command.
   */
  public function handle()
  {
    $this->info('Generating weekly sales report for each seller....');

    $this->generateWeeklyReports();
    // $this->generateMonthlyReports();

    $this->info('Weekly Sales reports generated Successfully!.');
  }

  private function generateWeeklyReports()
  {
    $startOfWeek  = Carbon::now()->startOfWeek()->format('Y-m-d');
    $endOfWeek = Carbon::now()->endOfWeek()->format('Y-m-d');

    $sellers = Seller::all();

    foreach ($sellers as $seller) {
      $reports = OrderItem::where('seller_id', $seller->id)
        ->whereBetween('is_delivered_date', [$startOfWeek, $endOfWeek])
        ->where('shipment_status', 'delivered')
        ->selectRaw('COALESCE(SUM(amount), 0) as total_sales')
        ->selectRaw('COUNT(id) as total_orders')
        ->first();


      WeeklySalesReport::updateOrCreate([
        'seller_id' => $seller->id,
        'report_date' => $endOfWeek,
        'total_sales' => $reports->total_sales,
        'total_orders' => $reports->total_orders
      ]);
    }
  }

  private function generateMonthlyReports()
  {
    $startOfMonth  = Carbon::now()->startOfMonth()->format('Y-m-d');
    $endOfMonth = Carbon::now()->endOfMonth()->format('Y-m-d');

    $sellers = Seller::all();

    foreach ($sellers as $seller) {
      $reports = OrderItem::where('seller_id', $seller->id)
        ->whereBetween('is_delivered_date', [$startOfMonth, $endOfMonth])
        ->where('shipment_status', 'delivered')
        ->selectRaw('COALESCE(SUM(amount), 0) as total_sales')
        ->selectRaw('COUNT(id) as total_orders')
        ->first();

      MonthlySalesReport::updateOrCreate([
        'seller_id' => $seller->id,
        'report_date' => $endOfMonth,
        'total_sales' => $reports->total_sales,
        'total_orders' => $reports->total_orders
      ]);
    }
  }
}
