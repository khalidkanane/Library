<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as FakerFactory;
use Illuminate\Support\Facades\DB;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = FakerFactory::create('fr_FR');

        // Get all user IDs from the users table
        $userIds = DB::table('authors')->pluck('id')->toArray();


              // List of image URLs
              $images = [
                '../Books/1715547621.jpg',
                '../Books/1715719183.jpg',
                '../Books/1716149892.jpg',
                '../Books/1715762564.jpg',
                '../Books/1715719958.jpg',
                // Add more URLs as needed
            ];

          

        // Define the number of posts you want to create
        $numberOfPosts = 15;

        // Loop through and create dummy posts
        for ($i = 0; $i < $numberOfPosts; $i++) {
            Book::create([
                'title' => $faker->sentence(),
                'category' => 'Derama',
                'content' => $faker->paragraph(),
                'image' =>   $images[array_rand($images)],
                'author_id' => $faker->randomElement($userIds), // Select a random user ID from the existing ones
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $faker->dateTimeBetween( 'now'),
            ]);
        }
    }
}