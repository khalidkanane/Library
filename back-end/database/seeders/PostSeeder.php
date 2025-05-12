<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as FakerFactory;
use Illuminate\Support\Facades\DB;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = FakerFactory::create('fr_FR');

        // Get all user IDs from the users table
        $userIds = DB::table('users')->pluck('id')->toArray();

        // Define the number of posts you want to create
        $numberOfPosts = 10;

        // Loop through and create dummy posts
        for ($i = 0; $i < $numberOfPosts; $i++) {
            Post::create([
                'title' => $faker->sentence(),
                'type' => 'user',
                'content' => $faker->paragraph(),
                'image' => 'https://via.placeholder.com/360x360.png',
                'video' => null, // No video for now
                'user_id' => $faker->randomElement($userIds), // Select a random user ID from the existing ones
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $faker->dateTimeBetween('-1 year', 'now'),
            ]);
        }
    }
}