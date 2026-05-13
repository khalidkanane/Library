<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CommentariesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Get all book ids and user ids from the database
        $bookIds = DB::table('books')->pluck('id')->toArray();
        $userIds = DB::table('users')->pluck('id')->toArray();

        // Check if there are any books and users available
        if (empty($bookIds) || empty($userIds)) {
            $this->command->info('No books or users found in the database.');
            return;
        }

        // Create 50 commentaries
        for ($i = 0; $i < 22; $i++) {
            DB::table('commentaries')->insert([
                'book_id' => $bookIds[array_rand($bookIds)],
                'user_id' => $userIds[array_rand($userIds)],
                'content' => Str::random(200), // Generate random content
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
