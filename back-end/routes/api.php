<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AiController;
use App\Http\Controllers\ControllerAuthor;
use App\Http\Controllers\ControllerBook;
use App\Http\Controllers\ControllerCommentaries;
use App\Http\Controllers\ControllerUser;
use App\Http\Controllers\RatingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/ratings', [RatingController::class, 'store']);
    Route::post('/changePassword', [AuthController::class, 'changePassword']);
    Route::delete('/DeleteAccount', [AuthController::class, 'deleteAccount']);
});


Route::get('/ratings/{postId}', [RatingController::class, 'show']);




Route::post('/login', [AuthController::class, 'Login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/loginGoogle', [AuthController::class, 'LoginGoogle']);
Route::post('/generate-text', [AiController::class, 'generateText']);

// Users Route 
Route::get('/users', [ControllerUser::class, 'index']);

Route::delete('users/delete/{id}', [ControllerUser::class, 'destroy']);
Route::post('users/update/{id}', [ControllerUser::class, 'update']);

Route::post('users/add', [ControllerUser::class, 'Add']);


// Books Route


Route::get('/Books', [ControllerBook::class, 'index']);
Route::post('Books/add', [ControllerBook::class, 'Add']);
Route::get('/lastbooks', [ControllerBook::class, 'Lastbooks']);
Route::get('Books/{id}', [ControllerBook::class, 'find']);
Route::delete('Books/{id}', [ControllerBook::class, 'destroy']);
Route::post('Books/update/{id}', [ControllerBook::class, 'update']);
Route::get('best_books', [ControllerBook::class, 'best_books']);
Route::get('category/{category}', [ControllerBook::class, 'getBooksByCategory']);

Route::get('topRatedBooks', [ControllerBook::class, 'topRatedBooks']);

// Author Route 

Route::get('/Authors', [ControllerAuthor::class, 'index']);
Route::delete('authors/delete/{id}', [ControllerAuthor::class, 'destroy']);
Route::post('Authors/add', [ControllerAuthor::class, 'Add']);
Route::post('Authors/update/{id}', [ControllerAuthor::class, 'update']);
Route::get('/Authors/{id}', [ControllerAuthor::class, 'find']);



// Route Comment

Route::get('/Comments', [ControllerCommentaries::class, 'index']);
Route::get('/Comments/{idbook}', [ControllerCommentaries::class, 'getCommentsByBook']);
Route::post('/Comments/add', [ControllerCommentaries::class, 'store']);
Route::delete('/Comments/delete/{id}', [ControllerCommentaries::class, 'destroy']);

// route 


Route::get('state', [ControllerUser::class, 'state']);


Route::get('/search', [ControllerBook::class, 'search']);
