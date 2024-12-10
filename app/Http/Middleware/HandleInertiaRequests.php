<?php

namespace App\Http\Middleware;

use App\Models\CartItem;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
  /**
   * The root template that is loaded on the first page visit.
   *
   * @var string
   */
  protected $rootView = 'app';

  /**
   * Determine the current asset version.
   */
  public function version(Request $request): string|null
  {
    return parent::version($request);
  }

  /**
   * Define the props that are shared by default.
   *
   * @return array<string, mixed>
   */
  public function share(Request $request): array
  {
    return [
      ...parent::share($request),
      'auth' => [
        'user' => $request->user(),
        'cartCount' => function () use ($request) {
          return $request->user() && !$request->user()->is_admin && !$request->user()->is_seller
            ? CartItem::where('user_id', $request->user()->id)->count()
            : 0;
        },
        'notificationCount' => Notification::where('to_user_id', auth()->id())
          ->where('is_read', 0)
          ->count()

      ],
      'ziggy' => fn() => [
        ...(new Ziggy)->toArray(),
        'location' => $request->url(),
      ],
      'flash' => [
        'message' => fn() => $request->session()->get('message'),
        'status' => fn() => $request->session()->get('status')
      ]
    ];
  }
}
