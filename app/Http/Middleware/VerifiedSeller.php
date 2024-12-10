<?php

namespace App\Http\Middleware;

use App\Models\Seller;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class VerifiedSeller
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response
  {

    $user = Auth::user();
    if ($user->is_admin) {
      return redirect()->route('admin.index');
    } else {
      $sellerData = Seller::where('user_id', $user->id)->first();

      if ($sellerData->is_verified == true && $user->is_seller == true) {
        // Proceed to the next request if the user is not admin and not customer
        return $next($request);
      } else {
        if ($sellerData->is_verified == false && $user->is_seller == true) {
          return redirect()->route('seller.pending.account');
        } else {
          abort(403, 'Unauthorized');
        }
      }
    }
  }
}
