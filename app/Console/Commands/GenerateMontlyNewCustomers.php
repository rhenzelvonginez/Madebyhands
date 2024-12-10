<?php

namespace App\Console\Commands;

use App\Models\MontlyNewCustomersReport;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;

class GenerateMontlyNewCustomers extends Command
{

  protected $signature = 'app:generate-montly-new-customers';
  protected $description = 'Generate monthly new customers';


  public function handle()
  {
    $this->info('Generating montly new customers, creating now.....');

    $startDate = Carbon::now()->subMonth()->startOfMonth();
    $endDate = Carbon::now()->subMonth()->endOfMonth();

    $newCustomersCount = User::where('is_seller', 0)
      ->where('is_admin', 0)
      ->whereBetween('created_at', [$startDate, $endDate])->count();

    MontlyNewCustomersReport::create([
      'month' => $startDate->format('Y-m'),
      'customers_count' => $newCustomersCount
    ]);

    $this->info('Monthly new customers report created successfully.');
  }
}
