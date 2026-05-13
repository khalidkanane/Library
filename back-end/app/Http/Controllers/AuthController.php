<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function Login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'invalid password or email', '1' => $request->email], 202);
        }

        $token = $user->createToken($user->name);

        return response()->json(['token' => $token->plainTextToken, 'user' => $user], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'password' => 'required',
            'email' => 'required|email',
        ]);

        $existingUser = User::where('email', $request->email)->first();

        if ($existingUser) {
            return response(['error' => 'email déjà existé '], 202);
        }

        $user = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'type' => 'user',
            'adresse' => 'mirleft',
            'image' => '../image/1715820285.jpg',
        ]);

        $user->save();

        return response(['success' => $user], 200);
    }

    public function LoginGoogle(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'image' => 'required|url',
        ]);

        $user = User::where('email', $request->email)->first();
        $image = $request->image;

        if (!$user) {
            $response = Http::get($image);

            if ($response->successful()) {
                $extension = pathinfo(parse_url($request->image, PHP_URL_PATH), PATHINFO_EXTENSION);
                $extension = $extension ?: 'jpg';

                $filename = Str::random(20) . '.' . $extension;
                $imageDirectory = public_path('image');

                if (!File::exists($imageDirectory)) {
                    File::makeDirectory($imageDirectory, 0755, true);
                }

                File::put($imageDirectory . DIRECTORY_SEPARATOR . $filename, $response->body());
                $image = '../image/' . $filename;
            }

            $newUser = new User([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'type' => 'user',
                'adresse' => 'Maroc',
                'image' => $image,
            ]);

            $newUser->save();
        }

        $user = User::where('email', $request->email)->first();
        $token = $user->createToken($user->name);

        return response()->json([
            'token' => $token->plainTextToken,
            'user' => $user,
            'image' => $user->image,
        ], 200);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'new_password' => 'required',
        ]);

        $authUser = Auth::user();
        if (!$authUser) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $user = User::find($authUser->id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->password = $request->new_password;
        $user->save();

        return response()->json(['message' => 'Password changed successfully'], 200);
    }

    public function deleteAccount(Request $request)
    {
        $user = $request->user();

        $request->user()->currentAccessToken()->delete();
        $user->delete();

        return response()->json(['message' => 'Account deleted successfully.'], 200);
    }
}
