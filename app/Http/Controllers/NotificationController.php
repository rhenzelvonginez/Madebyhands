<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Nette\Utils\Strings;

class NotificationController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $notification = Notification::where('to_user_id', auth()->id())
      ->orderBy('created_at', 'desc')
      ->get();
    return Inertia::render('Seller/Notification', [
      'notifications' => $notification
    ]);
  }

  public function destroy($id)
  {
    $notification = Notification::findOrFail($id);
    $notification->delete();

    // Fetch the remaining notifications
    $notifications = Notification::where('to_user_id', auth()->id())
      ->orderBy('created_at', 'desc')
      ->get();

    return Inertia::render('Seller/Notification', [
      'notifications' => $notifications,
      'message' => 'Notification deleted successfully'
    ]);
  }

  public function markAsRead($id)
  {
    $notification = Notification::findOrFail($id);
    $notification->update(['is_read' => true]);
    $notifications = Notification::where('to_user_id', auth()->id())
      ->orderBy('created_at', 'desc')
      ->get();
    return redirect()->back();
  }

  public function markAsUnread($id)
  {
    $notification = Notification::findOrFail($id);
    $notification->update(['is_read' => false]);

    $notifications = Notification::where('to_user_id', auth()->id())
      ->orderBy('created_at', 'desc')
      ->get();

    return redirect()->back();
  }

  public function notification()
  {
      $notification = Notification::where('to_user_id', auth()->id())
          ->orderBy('created_at', 'desc')
          ->get();
      
      // dd($notification);
  
      return Inertia::render('Shop/Notification', [
          'notifications' => $notification,
      ]);
  }
  
  

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(Notification $notification)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Notification $notification)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Notification $notification)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  // public function destroy(Strings $id)
  // {

  //   $isDeleted = $notification->delete();

  //   if ($isDeleted) {
  //     return response()->json([
  //       'message' => 'Deleted Successfully!',
  //       'status' => 'success'
  //     ]);
  //   } else {
  //     return response()->json([
  //       'message' => 'Error Deleting!',
  //       'status' => 'error'
  //     ]);
  //   }
  // }
}
