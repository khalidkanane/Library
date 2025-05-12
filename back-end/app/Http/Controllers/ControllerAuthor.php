<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ControllerAuthor extends Controller
{
    public function index()
    {
        $authors = Author::all();
        // $authors = author::paginate(5);
        return response()->json(["authors"=>$authors],200);
    }

    public function find(string $id)
    {
       
        $author = Author::find($id);
        if (is_null($author)) {
            return response()->json(['messcategory'=>'Utilisateur not found'], 404);
            
        }

        $book = DB::table('books')
                ->join('authors', 'books.author_id', '=', 'authors.id')
                ->select('books.id', 'books.title', 'books.content','books.pdf','books.category','books.date_public', 'books.image',"books.created_at", 'authors.name as author_name', 'authors.image as author_image')
                ->where('books.author_id', '=', $id)
                ->limit(4) 
                ->get();

        
        return response()->json(["book"=>$book,'author'=>$author],201);
        
    }

    public function Add(Request $request)
    {
        $request->only([

            'content' => 'required',
            'name'=>"required",
            'pdf'=>'required|mimes:pdf|max:10000',
            'daye_death'=>'required',
            'birthday'=>'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image file
        ]);



        $author = Author::where('name',$request->name)->first();

        if($author){
            return response()->json(['message' => 'the Author is exist']);
        }
        // '
        




       
       
    
        
    
       
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('Author'), $imageName);
            $imageName = '../Author/'.$imageName ;
        
            
        $author = new Author([
            'name' => $request->input('name'),
            'birthday' => $request->input('birthday'),
            'content' => $request->input('content'),
            'daye_death' => $request->input('daye_death'),
            'image' => $imageName,

        ]);
    
        $author->save();
    
        return response()->json(['message' => 'New author has save', 'author' => $author]);
    
    }
    public function update(Request $request, string $id)
    {


    // Validate incoming request data
    $request->only([
        'name' => 'required',
        'birthday' => 'required',
        'daye_death' => 'required|email', // Validate unique email
        'content' => 'required',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image file
    ]);
    // Find the author by ID
    
    

  //  Delete the old image if author already has one


    

 
    


    // $author = Author::where('name',$request->name)->first();




    // if($author){
    //     return response()->json(['message' => 'the Author is exist']);
    // }

    $author = Author::find($id);

    if ($author->image) {
        $oldImagePath = public_path('image' . $author->image);
        if (file_exists($oldImagePath)) {
            unlink($oldImagePath);
        }
        
    }

    

    $author->name = $request->input('name');
    
    $author->birthday = $request->input('birthday');
    $author->daye_death = $request->input('daye_death');
    

    // Update author image if provided
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('Author'), $imageName);
        $author->image = "../Author/".$imageName;
    }




    
    $author->save();

    return response()->json(['message' => 'author updated successfully', 'author' => $author]);


    }



    public function destroy(string $id)
    {
   
        $author=Author::find($id);
        $author->delete();
        return response()->json(["message"=>"Utilisateur supprimé avec succé "],204);
        
    }
}