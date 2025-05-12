<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function store(Request $request)
    {
        $request->only([
            'book_id' => 'required|exists:books,id',
            'rating' => 'required|integer|min:1|max:5'
        ]);

        $rating = Rating::updateOrCreate(
            ['user_id' => auth()->id(), 'book_id' => $request->book_id],
            ['rating' => $request->rating]
        );

        return response()->json(['rating' => $rating], 201);
    }

    public function show($bookId)
    {
        $rating = Rating::where('book_id', $bookId)->avg('rating');
        return response()->json(['rating' => $rating]);
    }
}