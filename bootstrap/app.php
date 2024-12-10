<?php

use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\EnsureNotAdminOrSeller;
use App\Http\Middleware\VerifiedSeller;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
  ->withRouting(
    web: __DIR__ . '/../routes/web.php',
    commands: __DIR__ . '/../routes/console.php',
    health: '/up',
  )
  ->withMiddleware(function (Middleware $middleware) {
    $middleware->web(append: [
      \App\Http\Middleware\HandleInertiaRequests::class,
      \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
      // EnsureNotAdminOrSeller::class,
    ]);
    $middleware->alias([
      'customer' => EnsureNotAdminOrSeller::class,
      'seller' => VerifiedSeller::class,
      'admin' => AdminMiddleware::class
    ]);
  })
  ->withExceptions(function (Exceptions $exceptions) {
    //
  })->create();