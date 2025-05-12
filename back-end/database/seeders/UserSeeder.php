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
     *
     * @return void
     */
    public function run()
    {
     
        $images = [
            '../image/1715515746.jpg',
            '../image/1715547726.jpg',
            '../image/1715612228.jpg',
            '../image/1715720864.jpg',
            '../image/1715818976.jpg',
            // Add more URLs as needed
        ];


        

        // Create multiple users using a loop
        $faker = FakerFactory::create('fr_FR');
        for ($i = 0; $i < 10; $i++) {
            User::create([
                'name' => $faker->firstName,
                'adresse' =>  $faker->address,
                'type' => 'user',
                'tel' => $faker->e164PhoneNumber ,
                'image' => $images[array_rand($images)],
                'email' =>  $faker->email,
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
            ]);



        }
    }
}