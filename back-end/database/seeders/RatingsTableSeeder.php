<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rating;
use App\Models\User;
use App\Models\Book;
use Faker\Factory as Faker;

class RatingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Get all users and books
        $users = User::all();
        $books = Book::all();

        // Seed ratings
        foreach ($users as $user) {
            foreach ($books as $book) {
                // Ensure not every book gets rated by every user to simulate realistic data
                if (rand(0, 1)) {
                    Rating::create([
                        'user_id' => $user->id,
                        'book_id' => $book->id,
                        'rating' => rand(1, 5)
                    ]);
                }
            }
        }
    }
}