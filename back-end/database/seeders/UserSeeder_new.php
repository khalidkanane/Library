<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as FakerFactory;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = FakerFactory::create('fr_FR');

        // Dynamically get all images from public/image folder
        $imagePath = public_path('image');
        $images = [];

        if (is_dir($imagePath)) {
            $files = glob($imagePath . '/*.*');
            foreach ($files as $file) {
                if (is_file($file)) {
                    $images[] = '../image/' . basename($file);
                }
            }
        }

        // Fallback if no images found
        if (empty($images)) {
            $images = ['../image/default.jpg'];
        }

        // Create 10 users
        for ($i = 0; $i < 10; $i++) {
            User::create([
                'name' => $faker->firstName,
                'adresse' => $faker->address,
                'type' => 'user',
                'tel' => $faker->phoneNumber,
                'image' => $images[array_rand($images)],
                'email' => $faker->unique()->safeEmail(),
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
            ]);
        }
    }
}
