<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response
  {

    $user = Auth::user();
    // return $sellerData;

    if ($user->is_admin) {
      // Allow access if the user is an admin
      return $next($request);
    } elseif ($user->is_seller) {
      // Redirect to seller dashboard if the user is a seller
      return redirect()->route('seller.dashboard');
    } elseif (!$user->is_seller && !$user->is_admin) {
      // Redirect to the user dashboard if the user is neither admin nor seller
      return redirect()->route('dashboard');
    } else {
      // Fallback for any other cases
      abort(403, 'Unauthorized');
    }
  }
}
