<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Seller;
use App\Models\OrderItem;
use Illuminate\Console\Command;
use App\Models\MonthlySalesReport;

class GenerateMonthlySalesReport extends Command
{
  protected $signature = 'app:generate-monthly-sales-report';
  protected $description  = 'Generate Monthly sales report for each sellers';

  /**
   * Execute the console command.
   */
  public function handle()
  {
    $this->info('Generating Monthly sales report for each seller....');
    $this->generateMonthlyReports();

    $this->info('Monthly Sales reports generated Successfully!.');
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
