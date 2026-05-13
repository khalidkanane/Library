<?php

namespace Database\Seeders;

use App\Models\Book;
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

        // Get all author IDs
        $authorIds = DB::table('authors')->pluck('id')->toArray();

        // Dynamically get all images from public/Books folder
        $bookImagePath = public_path('Books');
        $bookImages = [];
        
        if (is_dir($bookImagePath)) {
            $files = glob($bookImagePath . '/*.*');
            foreach ($files as $file) {
                if (is_file($file)) {
                    $bookImages[] = '../Books/' . basename($file);
                }
            }
        }
        
        // Fallback if no images found
        if (empty($bookImages)) {
            $bookImages = ['../Books/default.jpg'];
        }

        // Dynamically get all PDFs from public/Document folder
        $documentPath = public_path('Document');
        $documents = [];
        
        if (is_dir($documentPath)) {
            $files = glob($documentPath . '/*.pdf');
            foreach ($files as $file) {
                if (is_file($file)) {
                    $documents[] = '../Document/' . basename($file);
                }
            }
        }

        // Define categories for variety
        $categories = ['Fiction', 'Drama', 'Science', 'History', 'Mystery', 'Romance', 'Adventure'];
        
        // Create 15 books
        $numberOfBooks = 15;

        for ($i = 0; $i < $numberOfBooks; $i++) {
            Book::create([
                'title' => $faker->unique()->sentence(3),
                'category' => $faker->randomElement($categories),
                'content' => $faker->paragraphs(3, true),
                'date_public' => $faker->date(),
                'image' => $bookImages[array_rand($bookImages)],
                'pdf' => !empty($documents) ? $documents[array_rand($documents)] : null,
                'author_id' => $faker->randomElement($authorIds),
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $faker->dateTimeBetween('-1 year', 'now'),
            ]);
        }
    }
}
