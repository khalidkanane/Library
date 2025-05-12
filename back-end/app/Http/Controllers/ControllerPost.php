<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ControllerPost extends Controller
{
    public function index()
    {
       
        $posts = DB::table('posts')
            ->join('users', 'posts.user_id', '=', 'users.id')
            ->select('posts.id', 'posts.title', 'posts.content','posts.image', 'users.name as user_name', 'users.image as user_image')
            ->get();
        return response()->json(["posts"=>$posts],200);
    }

    public function Add(Request $request)
    {
        $request->only([
            'title' => 'required',
            'content' => 'required',
            'type' => 'required',
            'user_id' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image file
        ]);
    
        
    
       
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('Blogs'), $imageName);

            $imageName = '../Blogs/'.$imageName ;
        
    
        $post = new post([
            'title' => $request->input('title'),
            'type' => $request->input('type'),
            'content' => $request->input('content'),
            'user_id' => $request->input('user_id'),
            'image' => $imageName,

        ]);
    
        $post->save();
    
        return response()->json(['message' => $request->hasFile('image'), 'post' => $post]);
    
    }


    public function LastPosts()
    {
        $latestPosts = DB::table('posts')
                ->join('users', 'posts.user_id', '=', 'users.id')
                ->select('posts.id', 'posts.title', 'posts.content', 'posts.image',"posts.created_at", 'users.name as user_name', 'users.image as user_image')
                ->orderBy('posts.created_at', 'desc')
                ->limit(3)
                ->get();
    
        return response()->json(['message' =>'fine', 'posts' => $latestPosts]);
    
    }

    public function best_places()
    {
        $places = DB::table('posts')
                ->join('users', 'posts.user_id', '=', 'users.id')
                ->select('posts.id', 'posts.title', 'posts.content', 'posts.image',"posts.created_at", 'users.name as user_name', 'users.image as user_image')
                ->where('posts.type', '=', 'place') // Filter by type "place"
                ->limit(6)
                ->get();
    
        return response()->json(['message' =>'fine', 'places' => $places]);
    
    }

    public function Places()
    {
        $places = DB::table('posts')
                ->join('users', 'posts.user_id', '=', 'users.id')
                ->select('posts.id', 'posts.title', 'posts.content', 'posts.image',"posts.created_at", 'users.name as user_name', 'users.image as user_image')
                ->where('posts.type', '=', 'place') // Filter by type "place"
                ->get();
    
        return response()->json(['message' =>'fine', 'places' => $places]);
    
    }
    
    public function find(string $id)
    {
       
        $lore = Post::find($id);
        if (is_null($lore)) {
            return response()->json(['messtype'=>'Utilisateur not found'], 404);
            
        }

        $post = DB::table('posts')
                ->join('users', 'posts.user_id', '=', 'users.id')
                ->select('posts.id', 'posts.title', 'posts.content', 'posts.image',"posts.created_at", 'users.name as user_name', 'users.image as user_image')
                ->where('posts.id', '=', $id) // Filter by type "place"
                ->get();

        
        return response()->json(["post"=>$post],201);
        
    }
    

    
}