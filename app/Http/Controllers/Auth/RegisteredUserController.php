<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $request->validate([
                'first_name' => ['required', 'string', 'max:255'],
                'last_name' => ['required', 'string', 'max:255'],
                // 'address' => ['required', 'string', 'min:5'],
                'phone_no' => 'required|digits:11|unique:' . User::class,
                'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);
            // return dd($request->first_name);


            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'address' => $request->full_address,
                'email' => $request->email,
                'phone_no' => $request->phone_no,
                'password' => Hash::make($request->password),
            ]);

            $address = Address::create([
                'user_id' => $user->id,
                'full_address' => $request->full_address,
                'region' => $request->region,
                'active' => true,
            ]);
            // dd('passed');
            $user->update([
                'address_id' => $address->id
            ]);

            event(new Registered($user));

            Auth::login($user);
            DB::commit();
            return redirect(route('dashboard', absolute: false));
        } catch (\Exception $e) {
            return back()->with(['message' => 'Something went wrong ' . $e->getMessage()]);
        }
    }
}
