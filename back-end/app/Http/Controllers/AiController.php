<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AiController extends Controller
{
    public function generateText(Request $request)
    {
        $validated = $request->validate([
            'prompt' => 'required|string|min:3',
        ]);

        $apiKey = config('services.gemini.api_key');
        if (!$apiKey) {
            return response()->json(['error' => 'Gemini API key is missing on server.'], 500);
        }

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' . $apiKey,
            [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $validated['prompt']]
                        ]
                    ]
                ]
            ]
        );

        if (!$response->successful()) {
            return response()->json([
                'error' => 'Failed to generate text.',
                'details' => $response->json(),
            ], 500);
        }

        $text = data_get($response->json(), 'candidates.0.content.parts.0.text', '');

        return response()->json([
            'text' => $text,
            'message' => 'Text generated successfully',
        ]);
    }
}
