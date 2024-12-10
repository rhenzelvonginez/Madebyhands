<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('address');
            $table->string('phone_no', 11)->unique();
            $table->boolean('is_seller')->default(false);
            $table->boolean('is_admin')->default(false);
            $table->string('email')->unique();
            $table->string('profile_picture_path')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });



        User::factory()->createMany(
            [
                [
                    'first_name' => 'Admin',
                    'last_name' => 'Main',
                    'email' => 'admin@gmail.com',
                    'phone_no' => '09010113456',
                    'address' => 'Poblacion, Alaminos City, Pangasinan',
                    'is_admin' => true,
                    'password' => Hash::make('password')
                ],
                [
                    'first_name' => 'Rhenz',
                    'last_name' => 'Ginez',
                    'email' => 'rhenz30@gmail.com',
                    'phone_no' => '09373929921',
                    'address' => 'Lucap, Alaminos City, Pangasinan',
                    'is_seller' => true,
                    'password' => Hash::make('password')
                ],
                [
                    'first_name' => 'Richelle',
                    'last_name' => 'Villaflor',
                    'email' => 'richellev9708@gmail.com',
                    'phone_no' => '09946864609',
                    'address' => 'Lucap, Alaminos City, Pangasinan',
                    'is_seller' => true,
                    'password' => Hash::make('password')
                ],
                [
                    'first_name' => 'Merj',
                    'last_name' => 'Balicao',
                    'email' => 'Mjbalics@gmail.com',
                    'phone_no' => '09156972003',
                    'address' => 'Lucap, Alaminos City, Pangasinan',
                    'is_seller' => true,
                    'password' => Hash::make('password')
                ],
                [
                    'first_name' => 'John Carlos',
                    'last_name' => 'Libo-on',
                    'email' => 'liboonjohncarlos15@gmail.com',
                    'phone_no' => '09776661534',
                    'address' => 'Lucap, Alaminos City, Pangasinan',
                    'is_seller' => true,
                    'password' => Hash::make('password')
                ],
            ]
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
