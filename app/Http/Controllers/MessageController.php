<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function createMessage(Request $request)
    {
        $request->validate([
            'message' => 'required'
        ]);

        try {

            DB::beginTransaction();
            $conversation = Conversation::firstOrCreate(
                [
                    'user_id1' => $request->seller_id,
                    'user_id2' => Auth()->id(),
                ],
                [
                    'user_id1' => $request->seller_id,
                    'user_id2' => Auth()->id(),
                    'reference' => Str::uuid(),
                ]
            );

            $message = Message::create([
                'message' => $request->message,
                'sender_id' => Auth()->id(),
                'receiver_id' => $request->seller_id,
                'conversation_id' => $conversation->id
            ]);

            $conversation->update([
                'last_message_id' => $message->id,
            ]);

            DB::commit();

            return redirect()->back()->with([
                'status' => 'success',
                'message' => 'Message sent!'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with([
                'status' => 'error',
                'message' => 'Error ' . $e->getMessage()
            ]);
        }


    }

    public function messagesIndex()
    {
        $conversations = Conversation::with(['lastMessage', 'user1'])
            // ->where('user_id1', Auth::id())
            ->where('user_id2', Auth::id())
            ->where('is_deleted_by_user_id2', 0)
            ->orderBy('updated_at', 'desc')
            ->get();

        return Inertia::render('User/Messages', [
            'conversations' => $conversations
        ]);
    }

    public function retrieveConvo(Request $request)
    {
        $conversation = Conversation::where('reference', $request->reference)
            ->firstOrFail();

        $messages = Message::where('conversation_id', $conversation->id)
            ->with(['sender', 'receiver.seller'])
            ->get();

        if ($messages !== null) {
            return response()->json([
                'message' => 'Message retrieve',
                'messages' => $messages,
                'request data' => $request->all()
            ], 200);
        } else {
            return response()->json([
                'message' => 'Not found',
                'request data' => $request->all()
            ], 401);
        }
    }

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            $conversation = Conversation::firstOrCreate([
                'user_id1' => $request->receiver_id,
                'user_id2' => Auth()->id()
            ]);

            $message = Message::create([
                'message' => $request->message,
                'sender_id' => Auth()->id(),
                'receiver_id' => $request->receiver_id,
                'conversation_id' => $conversation->id
            ]);

            $conversation->update([
                'last_message_id' => $message->id,
            ]);
            DB::commit();
            return redirect()->back()->with(['message' => 'Message created!']);
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with([
                'message' => 'Error in ' . $e->getMessage(),
                'status' => 'error'
            ]);
        }
    }
    public function sellerReply(Request $request)
    {
        try {
            DB::beginTransaction();
            $conversation = Conversation::firstOrCreate([
                'user_id1' => Auth()->id(),
                'user_id2' => $request->receiver_id
            ]);

            $message = Message::create([
                'message' => $request->message,
                'sender_id' => Auth()->id(),
                'receiver_id' => $request->receiver_id,
                'conversation_id' => $conversation->id
            ]);

            $conversation->update([
                'last_message_id' => $message->id,
            ]);
            DB::commit();
            return redirect()->back()->with(['message' => 'Message created!']);
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with([
                'message' => 'Error in ' . $e->getMessage(),
                'status' => 'error'
            ]);
        }
    }

    public function sellerMessagesIndex()
    {
        $conversations = Conversation::with(['lastMessage', 'user1'])
            ->where('user_id1', Auth::id())
            ->where('is_deleted_by_user_id1', 0)
            ->orderBy('updated_at', 'desc')
            ->get();

        return Inertia::render('Seller/SellerMessages', [
            'conversations' => $conversations,
        ]);
    }

    public function deleteByCustomer(Request $request)
    {
        try {
            DB::beginTransaction();

            $conversation = Conversation::where('id', $request->convo_id)
                ->firstOrFail();

            $conversation->update(['is_deleted_by_user_id2' => 1]);

            if ($conversation->is_deleted_by_user_id1 && $conversation->is_deleted_by_user_id2) {
                Message::where('conversation_id', $conversation->id)
                    ->delete();
                $conversation->delete();
            }

            DB::commit();
            return redirect(route('message.index'))->with([
                // 'message' => 'Deleted successfully!.',
                // 'status' => 'success'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('message.index')->with([
                'message' => 'Something went wrong in ' . $e->getMessage(),
                'status' => 'Error'
            ]);
        }
    }

    public function deleteBySeller(Request $request)
    {

        try {
            DB::beginTransaction();

            $conversation = Conversation::where('id', $request->convo_id)
                ->firstOrFail();

            $conversation->update(['is_deleted_by_user_id1' => 1]);

            if ($conversation->is_deleted_by_user_id1 && $conversation->is_deleted_by_user_id2) {
                Message::where('conversation_id', $conversation->id)
                    ->delete();
                $conversation->delete();
            }

            DB::commit();
            return redirect(route('seller.messages.index'))->with([
                // 'message' => 'Deleted successfully!.',
                // 'status' => 'success'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('seller.messages.index')->with([
                'message' => 'Something went wrong in ' . $e->getMessage(),
                'status' => 'Error'
            ]);
        }
    }

    // endline
}
