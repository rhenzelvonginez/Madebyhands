<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\Products;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportProductController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'reason' => 'required|string|max:255',
            'details' => 'nullable|string|max:300',
        ]);

        $product = Products::findOrFail($validated['product_id']);

        Report::create([
            'product_id' => $validated['product_id'],
            'seller_id' => $product->seller_id,
            'reason' => $validated['reason'],
            'details' => $validated['details'],
            'user_id' => auth()->id(), 
        ]);

        session()->flash('success', 'Report submitted successfully.');
        return back();
    }

    public function show()
    {
        $reports = Report::with(['product.seller'])->get();
        return Inertia::render('Admin/ReportedProducts', [
            'reports' => $reports,
        ]);
    }
    public function verifyReport($id)
{
    $report = Report::findOrFail($id);
    $recipientId = $report->user_id ?? 1; 
    $product = $report->product;
    $product->update(['is_verified' => 0]);
    Notification::create([
        'title' => 'Product Report Verified',
        'body' => 'Your product "' . $product->product_name . '" has been reported and disabled from the platform.',
        'is_read' => 0,
        'created_by' => 1,  
        'to_user_id' => $product->seller->user_id, 
    ]);
    if ($recipientId) {
        Notification::create([
            'title' => 'Report Approved',
            'body' => 'The product "' . $product->product_name . '" you reported has been verified and disabled.',
            'is_read' => 0,
            'created_by' => auth()->id(),  
            'to_user_id' => $recipientId, 
        ]);
    }
    $report->delete();
    session()->flash('success', 'Report verified and product disabled.');
    return back();
}

    public function rejectReport($id)
    {
        $report = Report::with('user')->findOrFail($id);
    
        $recipientId = $report->user->id ?? 1; 
    
        Notification::create([
            'title' => 'Report Rejected',
            'body' => 'Your report for the product "' . $report->product->product_name . '" has been rejected.',
            'is_read' => 0,
            'created_by' => auth()->id(),
            'to_user_id' => $recipientId,  
        ]);
    
        $report->delete();
    
        session()->flash('success', 'Report rejected successfully.');
    
        return back();
    }
    

    
    
    
}
