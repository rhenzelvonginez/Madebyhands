<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\ShippingRateController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\OrderController;
use App\Http\Middleware\NotVerfiedSeller;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\WithdrawRequestController;
use App\Http\Controllers\ReportProductController;

// Route::get('/', function () {
//     return redirect()->route('login');
// });


Route::middleware('auth')
    ->get('/get-convo', [MessageController::class, 'retrieveConvo'])
    ->name('get.convo');

//Customer pages
Route::middleware('auth', 'customer')->group(function () {
    Route::get('/home', [ProductsController::class, 'customerHome'])->name('dashboard');
    Route::get('/my-profile', [UserController::class, 'showProfile'])->name('user.profile');
    Route::delete('/my-profile', [UserController::class, 'destroy'])->name('user.destroy');
    Route::put('/my-profile', [UserController::class, 'updatePassword'])->name('user.update.password');
    Route::post('/my-profile', [UserController::class, 'updateUserInformation'])->name('user.update.info');
    Route::get('/shop', [ProductsController::class, 'allProducts'])->name('shop');
    Route::get('/shop/{shopid}', [SellerController::class, 'showShop'])->name('shop.profile');
    Route::get('/product/{productid}', [ProductsController::class, 'viewProduct'])->name('view-product');
    Route::post('/store-to-cart', [CartController::class, 'addToCart'])->name('cart.store');
    Route::get('/messages', function () {
        return Inertia::render('ChatLayout');
    })->name('user.messages');
    Route::get('/cart', [CartController::class, 'currentCartList'])->name('user-cart');
    Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.item.destroy');
    Route::get('/my-purchases', [OrderController::class, 'index'])->name('user.myPurchases');
    Route::get('my-purchases/order-details/{orderId}', [OrderController::class, 'orderDetails'])->name('order.details');
    Route::get('my-purchases/cancel-order/{orderId}', [OrderController::class, 'showCancelOrder'])->name('order.show.cancel');
    Route::patch('my-purchases/cancelling-order', [OrderController::class, 'cancelOrder'])->name('order.cancel');
    Route::patch('my-purchases/order-received', [OrderController::class, 'processOrderReceived'])->name('order.received');
    Route::get('/my-purchases/rate-order/{orderId}', [ReviewController::class, 'getRatePage'])->name('rate.show');
    Route::post('/my-purchases/create-rate-order/{orderId}', [ReviewController::class, 'creatReview'])->name('rate.create');
    Route::get('/checkout', [CheckoutController::class, 'show'])->name('checkout.show');
    Route::post('/checkout/create', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::get('pay', [PaymentController::class, 'pay'])->name('pay.show');
    Route::get('checkout/success/{orderID}', [CheckoutController::class, 'successPage'])->name('checkout.success');
    Route::get('/message', [MessageController::class, 'messagesIndex'])->name('message.index');
    Route::post('chat-seller', [MessageController::class, 'createMessage'])->name('chat.seller');
    Route::post('store-chat', [MessageController::class, 'store'])->name('store.chat');
    Route::patch('delete-my-chat', [MessageController::class, 'deleteByCustomer'])->name('customer.delete.convo');
    Route::post('/reports', [ReportProductController::class, 'store']);
    Route::get('/notification', [NotificationController::class, 'notification'])->name('notification.show');
    Route::patch('/notifications/{id}/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.markAsRead');
    Route::patch('/notifications/{id}/mark-as-unread', [NotificationController::class, 'markAsUnread'])->name('notifications.markAsUnread');
    Route::delete('/notifications/{id}', [NotificationController::class, 'destroy'])->name('notifications.destroy');
});


// Admin
Route::prefix('admin')->middleware('admin', 'auth')->group(function () {
    Route::get('/index', [AdminController::class, 'adminDashboard'])->name('admin.index');
    Route::get('/sellers-list', [AdminController::class, 'index'])->name('admin.sellers');
    Route::get('/users-list', [AdminController::class, 'indexUsers'])->name('admin.users');
    Route::get('/permission', [AdminController::class, 'viewAllProducts'])->name('admin.permission');
    Route::patch('permission/toggle-verification/{id}', [AdminController::class, 'toggleProductVerification'])->name('admin.permission.toggleVerification');
    Route::delete('destroy-pending-product/{id}/{name}', [AdminController::class, 'destroyPendingProduct'])->name('admin.destroy.product');
    Route::get('/view-seller/{id}', [AdminController::class, 'viewSellerData'])->name('admin.view-seller');
    Route::put('view-seller/{id}', [AdminController::class, 'updateSeller'])->name('admin.update-seller');
    Route::delete('view-seller/{id}', [AdminController::class, 'destroySellerData'])->name('admin.destroy.sellerdata');
    Route::put('/view-seller-status/{id}', [AdminController::class, 'updateSellerStatus'])->name('admin.update.seller.status');
    Route::get('paymongo/payments', [AdminController::class, 'paymongoPaymentsIndex'])->name('paymongo.payments');
    Route::get('paymongo/payments/{id}', [AdminController::class, 'paymentInfo'])->name('paymongo.payment.info');
    Route::get('widthdrawal-lists', [WithdrawRequestController::class, 'index'])->name('widthdrawal.request.index');
    Route::post('widthdrawal-lists/update/{id}/{status}/{amount}', [WithdrawRequestController::class, 'updateRequest'])->name('withdrawal.request.update');
    Route::get('/reported-products', [ReportProductController::class, 'show'])->name('admin.reportedProducts');
    Route::post('/reports/{id}/verify', [ReportProductController::class, 'verifyReport']);
    Route::post('/reports/{id}/reject', [ReportProductController::class, 'rejectReport']);
    Route::get('/shipping-rates', [ShippingRateController::class, 'getShippingRates'])->name('admin.get.shipping-rates');
    Route::put('/shipping-rates/{id}', [ShippingRateController::class, 'updateShippingRate']);
});

// //unverified seller account
Route::get('/created-success-pending', function () {
    return Inertia::render('StatusPages/SuccessSellerAccount');
})->name('seller.created.success');
Route::get('/seller-account-on-the-process', function () {
    return Inertia::render('StatusPages/PendingSellerAccount');
})
    ->middleware(NotVerfiedSeller::class)
    ->name('seller.pending.account');

//seller pages
Route::prefix('seller')->middleware('seller', 'auth')->group(function () {
    Route::get('/index', [SellerController::class, 'dashboard'])->name('seller.dashboard');
    Route::get('/my-shop', [SellerController::class, 'myShop'])->name('seller.shop');
    Route::patch('/my-shop/process-order', [OrderController::class, 'processOrder'])->name('seller.order.process');
    Route::patch('/my-shop/process-order/preparing', [OrderController::class, 'processOrderPreparing'])->name('seller.order.process.preparing');
    Route::patch('/my-shop/process-order/ready-for-pickup', [OrderController::class, 'processOrderForPickUp'])->name('seller.order.process.forPickup');
    Route::patch('/my-shop/process-order/in-transit', [OrderController::class, 'processOrderToReceive'])->name('seller.order.process.toReceive');
    Route::patch('/my-shop/process-order/out-for-delivery', [OrderController::class, 'processOrderOutForDelivery'])->name('seller.order.process.outForDelivery');
    Route::get('my-profile', [SellerController::class, 'profileIndex'])->name('seller.profile');
    Route::post('my-profile', [SellerController::class, 'updateSellerInformation'])->name('seller.update.profile');
    Route::put('my-profile', [SellerController::class, 'updatePassword'])->name('seller.update.password');
    Route::delete('my-profile', [SellerController::class, 'destroySellerAccount'])->name('seller.destroy.profile');
    Route::get('/products', [SellerController::class, 'products'])->name('seller.products');
    Route::get('/add-product', [SellerController::class, 'showAddProduct'])->name('seller.showAddProduct');
    Route::post('addproduct', [SellerController::class, 'store'])->name('seller.addproduct');
    Route::delete('destroyproduct/{id}', [SellerController::class, 'destroy'])->name('seller.destroy.product');
    Route::post('/product/update', [ProductsController::class, 'update'])->name('seller.post.product');
    Route::get('/view/product/{id}', [ProductsController::class, 'sellerViewEditProduct'])->name('seller.view.product');
    Route::get('/notification', [NotificationController::class, 'index'])->name('seller.showNotification');
    Route::delete('/notifications/{id}', [NotificationController::class, 'destroy'])->name('notifications.destroy');
    Route::patch('/notifications/{id}/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.markAsRead');
    Route::patch('/notifications/{id}/mark-as-unread', [NotificationController::class, 'markAsUnread'])->name('notifications.markAsUnread');
    Route::get('finance', [SellerController::class, 'finance'])->name('seller.finance');
    Route::get('finance/wallet-transactions', [WithdrawRequestController::class, 'walletTransactionList'])->name('seller.walletTransactionList');
    Route::get('finance/order-receipt-report', [SellerController::class, 'orderReceiptReportIndex'])->name('seller.order-receipt-report');
    Route::get('finance/request', [WithdrawRequestController::class, 'requestPayoutForm'])->name('seller.request.withdraw');
    Route::post('finance/request/create', [WithdrawRequestController::class, 'createWithdraw'])->name('seller.store.withdraw');
    Route::get('shipping-setting', [SellerController::class, 'showShippingSetting'])->name('seller.shipping.setting');
    Route::get('messages', [MessageController::class, 'sellerMessagesIndex'])->name('seller.messages.index');
    Route::post('seller-reply-chat', [MessageController::class, 'sellerReply'])->name('seller.reply.chat');
    Route::patch('delete-my-chat', [MessageController::class, 'deleteBySeller'])->name('seller.delete.convo');
});

Route::get('/about', function () {
    return Inertia::render('About');
})->middleware(['auth'])->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->middleware(['auth'])->name('contact');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
});

//testing area here
Route::get('pay/success', [PaymentController::class, 'success'])->name('pay.success');
Route::get('pay/error', [PaymentController::class, 'error'])->name('pay.error');


require __DIR__ . '/auth.php';
