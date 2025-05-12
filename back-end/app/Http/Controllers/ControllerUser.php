<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ControllerUser extends Controller
{

    //
  /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users=User::all();
        // $users = User::paginate(5);
        return response()->json(["users"=>$users,"paht"=>public_path()],200);
    }

    /**
     * Store a newly created resource in stortype.
     */
    public function Add(Request $request)
    {
        $request->only([
            'name' => 'required',
            'adresse' => 'required',
            'type' => 'required',
            'email' => 'required|email|unique:users,email', // Validate unique email
            'tel' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image file
        ]);
    
        
    
       
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('image'), $imageName);

            $imageName = '../image/'.$imageName ;
        
    
        $user = new User([
            'name' => $request->input('name'),
            'type' => $request->input('type'),
            'adresse' => $request->input('adresse'),
            'email' => $request->input('email'),
            'tel' => $request->input('tel'),
            'image' => $imageName,
            'password' => Hash::make('password')
        ]);
    
        $user->save();
    
        return response()->json(['message' => $request->hasFile('image'), 'user' => $user]);
    
    }

    /**
     * Display the specified resource.
     */


    /**
     * Update the specified resource in stortype.
     */
    public function update(Request $request, string $id)
    {


    // Validate incoming request data
    $request->only([
        'name' => 'required',
        'adresse' => 'required',
        'email' => 'required|email', // Validate unique email
        'tel' => 'required',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image file
    ]);
    // Find the user by ID
    
    $user = User::find($id);

  //  Delete the old image if user already has one
    if ($user->image) {
        $oldImagePath = public_path('image' . $user->image);
        if (file_exists($oldImagePath)) {
            unlink($oldImagePath);
        }
        
    }

 
    
    $user->name = $request->input('name');
    // $user->email = $request->input('email');
    $user->adresse = $request->input('adresse');
    $user->tel = $request->input('tel');
    

    // Update user image if provided
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('image'), $imageName);
        $user->image = "../image/".$imageName;
    }

    if (isset($request->password)) {
        $user->password = Hash::make($request->password);
    }


    
    $user->save();

    return response()->json(['message' => 'User updated successfully', 'user' => $user]);


    }

    /**
     * Remove the specified resource from stortype.
     */
    public function destroy(string $id)
    {
   
        $user=User::find($id);
        $user->delete();
        return response()->json(["message"=>"Utilisateur supprimé avec succé "],204);
        
    }

    public function state()
    {
        $userCount = User::count();
        $bookCount = Book::count();
        $authorCount = Author::count();

        return response()->json([
            'userCount' => $userCount,
            'authorCount' => $authorCount,
            'bookCount' => $bookCount
        ]);
    }


    


 
    

    
    
}