<?php

namespace App\Http\Middleware;

use App\Models\Seller;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class NotVerfiedSeller
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response
  {

    if (Auth::check()) {
      $user = Auth::user();
      $sellerData = Seller::where('user_id', $user->id)->first();
      // return $sellerData;
      if ($sellerData->is_verified == false && $user->is_seller == true) {
        // Proceed to the next request if the user is not admin and not seller
        return $next($request);
      } else {
        // Abort with 403 forbidden if the user is admin or seller
        abort(403, 'Unauthorized');
      }
    } else {
      return redirect()->route('login');
    }
  }
}
