<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rules\RequiredIf;

class ControllerBook extends Controller
{
    public function index()
    {
       
        $books = DB::table('books')
            ->join('authors', 'books.author_id', '=', 'authors.id')
            ->select('books.id', 'books.title', 'books.content','books.pdf','books.category','books.date_public','books.image', 'authors.name as author_name', 'authors.image as author_image')
            ->get();
        return response()->json(["books"=>$books],200);
    }

    public function Add(Request $request)
    {
        $request->only([
            'title' => 'required',
            'content' => 'required',
            'category' => 'required',
            'author_name'=>"required",
            'pdf'=>'required|mimes:pdf|max:10000',
            'date_public'=>'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image file
        ]);



        $author = Author::where('name',$request->author_name)->first();

        if(!$author){
            return response()->json(['message' => 'the Author how you insert is not exist ']);
        }
        // '
        


        $file = $request->file('pdf');
        $fileName = time() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('Document'), $fileName);
        
        $fileName = '../Document/'.$fileName ;

       
       
    
        
    
       
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('Books'), $imageName);

            $imageName = '../Books/'.$imageName ;
        
    
        $book = new Book([
            'title' => $request->input('title'),
            'category' => $request->input('category'),
            'content' => $request->input('content'),
            'author_id' => $author->id,
            'date_public' => $request->input('date_public'),
            'pdf'=>$fileName,
            'image' => $imageName,

        ]);
    
        $book->save();
    
        return response()->json(['message' => 'New Book has save', 'book' => $book]);
    
    }


    public function Lastbooks()
    {
        $latestbooks = DB::table('books')
                ->join('authors', 'books.author_id', '=', 'authors.id')
                ->select('books.id', 'books.title', 'books.content','books.pdf','books.category','books.date_public', 'books.image',"books.created_at", 'authors.name as author_name', 'authors.image as author_image')
                ->orderBy('books.created_at', 'desc')
                ->limit(3)
                ->get();
    
        return response()->json(['message' =>'fine', 'books' => $latestbooks]);
    
    }

    public function best_books()
    {
        $books = DB::table('books')
                ->join('authors', 'books.author_id', '=', 'authors.id')
                ->select('books.id', 'books.title', 'books.content','books.pdf','books.category','books.date_public', 'books.image',"books.created_at", 'authors.name as author_name', 'authors.image as author_image')
                ->where('books.category', '=', 'Derama') // Filter by category "place"
                ->limit(6)
                ->get();
    
        return response()->json(['message' =>'fine', 'books' => $books]);
    
    }

    public function books()
    {
        $books = DB::table('books')
                ->join('authors', 'books.author_id', '=', 'authors.id')
                ->select('books.id', 'books.title', 'books.content','books.pdf','books.category','books.date_public', 'books.image',"books.created_at", 'authors.name as author_name', 'authors.image as author_image')
                ->where('books.category', '=', 'Derama') // Filter by category "place"
                ->get();
    
        return response()->json(['message' =>'fine', 'books' => $books]);
    
    }
    
    public function find(string $id)
    {
       
        $lore = Book::find($id);
        if (is_null($lore)) {
            return response()->json(['messcategory'=>'Utilisateur not found'], 404);
            
        }

        $book = DB::table('books')
                ->join('authors', 'books.author_id', '=', 'authors.id')
                ->select('books.id','books.author_id', 'books.title', 'books.content','books.pdf','books.category','books.date_public', 'books.image',"books.created_at", 'authors.name as author_name', 'authors.image as author_image')
                ->where('books.id', '=', $id) // Filter by category "place"
                ->get();

        
        return response()->json(["book"=>$book],201);
        
    }

    



    public function update(Request $request, string $id)
    {


    // Validate incoming request data
    $request->only([
        'title' => 'required',
        'content' => 'required',
        'category' => 'required',
        'author_name'=>"required",
        'pdf'=>'required|mimes:pdf|max:10000',
        'date_public'=>'required',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image file
    ]);



    $author = Author::where('name',$request->author_name)->first();

    if(!$author){
        return response()->json(['message' => 'the Author how you insert is not exist ']);
    }
    $book=Book::find($id);

  //  Delete the old image if user already has one

  if ($book->pdf) {
    $oldpdfPath = public_path('pdf' . $book->pdf);
    if (file_exists($oldpdfPath)) {
        unlink($oldpdfPath);
    }
    
}





// Update book pdf if provided
if ($request->hasFile('pdf')) {
    $pdf = $request->file('pdf');
    $pdfName = time() . '.' . $pdf->getClientOriginalExtension();
    $pdf->move(public_path('Document'), $pdfName);
    $book->pdf = "../Document/".$pdfName;
}



  
    if ($book->image) {
        $oldImagePath = public_path('image' . $book->image);
        if (file_exists($oldImagePath)) {
            unlink($oldImagePath);
        }
        
    }

 
    


    // Update book image if provided
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('Books'), $imageName);
        $book->image = "../Books/".$imageName;
    }

    $book->title = $request->input('title');
    $book->category = $request->input('category');
    $book->content = $request->content;
    $book->author_id = $author->id;
    $book->date_public = $request->input('date_public');


   


    
    $book->save();

    return response()->json(['message' => 'book updated successfully', 'book' => $book]);


    }




    public function destroy(String $id)
    {
        // $id = 1 ;
        $book=Book::find($id);


        if ($book->image) {
            $oldImagePath = public_path('Books' . $book->image);
            if (file_exists($oldImagePath)) {
            //   unlink($oldImagePath);
            }
            
        }

        if ($book->pdf) {
            $oldPdfPath = public_path('Document' . $book->Pdf);
            if (file_exists($oldPdfPath)) {
                // unlink($oldPdfPath);
            }
            
        }

        

        





        
        $book->delete();
        return response()->json(["message"=> $id,'book'=>$oldImagePath],200);
        
    }    

    public function topRatedBooks()
    {
        $topBooks =  $topBooks = DB::table('books')
        ->join('ratings', 'books.id', '=', 'ratings.book_id')
        ->join('authors', 'books.author_id', '=', 'authors.id')
        ->select(
            'books.id',
            'books.title',
            'books.content',
            'books.image',
            'books.category',
            'books.created_at',
            'authors.name as author_name',
            'authors.image as author_image',
            DB::raw('AVG(ratings.rating) as avg_rating')
        )
        ->groupBy('books.id', 'books.title', 'books.content', 'books.image','books.category','books.created_at', 'authors.name','author_image')
        ->orderByDesc('avg_rating')
        ->limit(10)
        ->get();




        return response()->json(['books'=> $topBooks]);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');

        $authors = Author::where('name', 'like', "%{$query}%")->get();
        $books = Book::where('title', 'like', "%{$query}%")->get();

        return response()->json([
            'authors' => $authors,
            'books' => $books,
        ]);
    }


     public function getBooksByCategory(String $category)
    {
        // Fetch books by category
        $books = Book::where('category',$category)->get();

        // Return the books as a JSON response
        return response()->json(['books'=>$books,'category'=>$category]);
    }

    
}