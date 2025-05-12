<?php

namespace Database\Seeders;

use App\Models\Author;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as FakerFactory;
use Illuminate\Support\Facades\DB;

class AuthorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

  


     
    public function run(): void
    {

        $faker = FakerFactory::create('fr_FR');

        // Get all user IDs from the users table

        $images = [
            '../Author/1715890280.jpg',
            '../Author/1715896813.jpg',
            '../Author/1715966132.jpg',
            '../Author/1715966650.jpg',
            '../Author/1715976843.jpg',
            // Add more URLs as needed
        ];

        
      
   
        // Define the number of posts you want to create
        $numberOfPosts = 15;
        
        for ($i = 0; $i < $numberOfPosts; $i++) {
            Author::create([
                'name' => $faker->firstName,
                'birthday'=>'1960-05-03',
                'daye_death'=>'2023-05-03',
                'content' => $faker->paragraph(),
                'image' => $images[array_rand($images)],
                'created_at' => $faker->dateTimeBetween('now'),
                'updated_at' => $faker->dateTimeBetween('now'),
            ]);
        }
    }
}