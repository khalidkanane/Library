<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
class AuthController extends Controller
{
    public function Login(Request $request)
    {

        $request->only([
            'email' => 'required|email',
            'password' => 'required',
        ]);



        $user = User::where("email", $request->email)->first();



        if (!$user ||  $request->password != $user->password) {
            return response()->json(['error' => 'invalid password or email', '1' => $request->email], 202);
        }

        $token = $user->createToken($user->name);
        return response()->json(['token' => $token->plainTextToken, 'user' => $user], 200);
    }


    function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }

    public function register(Request $request)
    {
        $request->only([
            'name' => 'required',
            'password' => 'required',
            'email' => 'required|email',

            
        ]);

        
        

        $demande = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' =>$request->input('password'),
            'type'=>'user',
            'adresse'=>'mirleft',
            'image'=>'../image/1715820285.jpg',
            
            
        ]);

        $user = User::where('email', $request->email)->first();

        if($user){
            return response(['error'=>'email déjà existé '],202);
        };

        $demande->save();

        return response(['success'=>$demande],200);
    }
    

    public function LoginGoogle(Request $request)
    {

        $request->only([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'image'=>'required'
            
        ]);

   



        $user = User::where("email", $request->email)->first();
        $image = $request->image;



        if (!$user) {


            

        
            $response = Http::get($image);
            if ($response->successful()) {
                // Get the image extension
                // $extension = pathinfo($image, PATHINFO_EXTENSION);
                // Create a unique filename
                $filename = Str::random(10) . '.' . 'jpg';
                // Define the path to store the image
              
      
                // Ensure the images directory exists
               


                
                File::put('image/'.$filename, $response->body());

                $image = '../image/'.$filename;

               
                
    
             
              
              
            }
            
            $demande = new User([
                'name' => $request->name,
                'email' => $request->email,
                'password' =>$request->password,
                'type'=>'user',
                'adresse'=>'Maroc',
                'image'=>$image,
                
                
            ]);
            
            $demande->save();



            
        }

        $user = User::where("email", $request->email)->first();

        $token = $user->createToken($user->name);
        return response()->json(['token' =>$token->plainTextToken, 'user' => $user,'image'=>$image], 200);
    }


    public function changePassword(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'new_password' => 'required',
                ]);

        // Get the authenticated user
        $user = Auth::user();

        // Check if the current password is correct


        // Update the password
        $user->password = $request->new_password;
        $user->save();
        

        return response()->json(['message' => 'Password changed successfully'], 200);
    }




    public function deleteAccount(Request $request)
    {
        $user = $request->user();
    
        // Perform any necessary cleanup (e.g., delete related data)
        $request->user()->currentAccessToken()->delete();
        // Delete the user
        $user->delete();
    
        return response()->json(['message' => 'Account deleted successfully.'], 200);
    }
    




    
}