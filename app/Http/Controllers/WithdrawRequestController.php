<?php

namespace App\Http\Controllers;

use App\Mail\WithdrawalNotification;
use App\Models\Notification;
use App\Models\Seller;
use App\Models\SellersWallets;
use App\Models\SellersWalletTransaction;
use App\Models\WithdrawRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class WithdrawRequestController extends Controller
{
  public function requestPayoutForm()
  {
    $user = auth()->user();
    $seller = Seller::where('user_id', $user->id)->with('wallet')->firstOrFail();

    $wallet = $seller->wallet;

    return Inertia::render('Seller/WithdrawalRequestForm', [
      'balance' => $wallet->balance
    ]);
  }

  public function createWithdraw(Request $request)
  {

    $user = auth()->user();
    $seller = Seller::where('user_id', $user->id)->with('wallet')->firstOrFail();

    $wallet = $seller->wallet;

    $request->validate([
      'amount' => 'integer|min:10|max:' . $wallet->balance,
      'payment_method' => 'required|in:gcash,maya',
      'account_name' => 'required|string',
      'account_number' => 'required|string',
    ]);

    try {
      DB::beginTransaction();

      WithdrawRequest::create([
        'seller_id' => $seller->id,
        'amount' => $request->amount,
        'status' => 'pending',
        'payment_method' => $request->payment_method,
        'account_name' => $request->account_name,
        'account_number' => $request->account_number,
      ]);

      $wallet->decrement('balance', $request->amount);
      DB::commit();

      return redirect()->route('seller.finance')->with([
        'status' => 'success',
        'message' => 'Request withdrawal success.'
      ]);
    } catch (\Exception $e) {
      DB::rollBack();
      return redirect()->route('seller.request.withdraw')->with([
        'status' => 'error',
        'message' => 'An error occurred during the withdrawal process.' . $e->getMessage(),
      ]);
    }
  }

  public function index()
  {
    $requestsLists = WithdrawRequest::with('sellerData', 'sellerData.user')->orderBy('updated_at', 'desc')->get();

    return Inertia::render('Admin/WithdrawalRequests', [
      'requestsLists' => $requestsLists
    ]);
  }

  public function updateRequest($id, $status, $amount)
  {
    try {
      DB::beginTransaction();
      $request = WithdrawRequest::with('sellerData.user')->findOrFail($id);
      $request->update([
        'status' => $status
      ]);

      $sellers_wallet = SellersWallets::where('seller_id', $request->seller_id)->first();
      $email = $request->sellerData->user->email;

      if ($status == 'rejected') {

        $sellers_wallet->increment('balance', $amount);

        SellersWalletTransaction::create([
          'wallet_id' => $sellers_wallet->id,
          'type' => 'withdraw_revert',
          'amount' => $amount,
          'reference_number' => $this->generateWalletTransactionReference()
        ]);

        Notification::create([
          'title' => 'Withdrawal Request Rejected',
          'body' => "Your withdrawal request for the amount of $amount has been rejected. The amount has been credited back to your wallet and is now reflected in your current balance.",
          'to_user_id' => $request->sellerData->user->id
        ]);
      } else {

        SellersWalletTransaction::create([
          'wallet_id' => $sellers_wallet->id,
          'type' => 'withdrawal',
          'amount' => $amount,
          'reference_number' => $this->generateWalletTransactionReference()
        ]);

        Notification::create([
          'title' => 'Withdrawal Request Processed',
          'body' => "Your withdrawal request for the amount of $amount has been successfully processed. The funds have been transferred to your preferred bank account.",
          'to_user_id' => $request->sellerData->user->id
        ]);
      }
      Mail::to($email)->send(new WithdrawalNotification($status, $amount));
      DB::commit();
      return to_route('widthdrawal.request.index')->with([
        'status' => 'success',
        'message' => $status == 'rejected' ? 'Withdraw request rejected ' : 'Payment Confirmation sent!'
      ]);
    } catch (\Exception $e) {
      DB::rollBack();
      return to_route('widthdrawal.request.index')->with([
        'status' => 'error',
        'message' => $e->getMessage()
      ]);
    }
  }

  public function walletTransactionList()
  {
    $user = auth()->user();
    $seller = Seller::where('user_id', $user->id)
      ->with(['wallet' => function ($query) {
        // Eager load wallet transactions and sort by created_at in descending order
        $query->with(['walletTransactions' => function ($query) {
          $query->orderBy('created_at', 'desc');
        }]);
      }])
      ->orderBy('created_at')
      ->firstOrFail();

    if (!$seller || !$seller->wallet) {
      return Inertia::render('Seller/WalletTransactionList', [
        'walletTransactions' => [],
      ]);
    }

    $wallet = $seller->wallet;
    $walletTransactions = $wallet->walletTransactions;


    return Inertia::render('Seller/WalletTransactionList', [
      'walletTransactions' => $walletTransactions
    ]);
  }



  private function generateWalletTransactionReference($prefix = 'WLT')
  {
    $timestamp = now()->format('YmdHis'); // Current timestamp in YmdHis format
    $randomNumber = mt_rand(1000, 9999);  // Random 4-digit number

    return $prefix . $timestamp . $randomNumber;
  }
  // endline
}
