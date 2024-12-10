<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
  $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();


Schedule::command('app:generate-weekly-sales-report')
  ->weeklyOn(1, '00:00')
  ->timezone('Asia/Manila');

Schedule::command('app:generate-monthly-sales-report')
  ->monthlyOn(1, '00:00')
  ->timezone('Asia/Manila');

Schedule::command('app:generate-montly-new-customers')
  ->monthlyOn(1, '00:00')
  ->timezone('Asia/Manila');

Schedule::command('app:generate-monthly-payments-report')
  ->monthlyOn(1, '00:00')
  ->timezone('Asia/Manila');
