<?php

namespace Database\Seeders;

use App\Models\Author;
use Illuminate\Database\Seeder;
use Faker\Factory as FakerFactory;

class AuthorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = FakerFactory::create('fr_FR');

        // Dynamically get all images from public/Author folder
        $authorImagePath = public_path('Author');
        $images = [];
        
        if (is_dir($authorImagePath)) {
            $files = glob($authorImagePath . '/*.*');
            foreach ($files as $file) {
                if (is_file($file)) {
                    $images[] = '../Author/' . basename($file);
                }
            }
        }
        
        // Fallback if no images found
        if (empty($images)) {
            $images = ['../Author/default.jpg'];
        }

        // Create 15 authors
        $numberOfAuthors = 15;
        
        for ($i = 0; $i < $numberOfAuthors; $i++) {
            Author::create([
                'name' => $faker->firstName,
                'birthday' => $faker->dateTimeBetween('-60 years', '-20 years'),
                'daye_death' => $faker->optional()->dateTimeBetween('-5 years', 'now'),
                'content' => $faker->paragraph(),
                'image' => $images[array_rand($images)],
                'created_at' => $faker->dateTimeBetween('-2 years', 'now'),
                'updated_at' => $faker->dateTimeBetween('-2 years', 'now'),
            ]);
        }
    }
}
