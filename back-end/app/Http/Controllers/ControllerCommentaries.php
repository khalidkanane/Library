<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Commentaries;

use Illuminate\Http\Request;

class ControllerCommentaries extends Controller
{
    /**
     * Afficher la liste des commentaires.
     */
    public function index()
    {
        $commentaries = Commentaries::with(['book', 'user'])->get();
        
        if (!$commentaries) {
            return response()->json(['message' => 'Commentary not found']);
        }

        return response()->json(['comments' => $commentaries], 200);
    }

    /**
     * Enregistrer un nouveau commentaire.
     */
    public function store(Request $request)
    {
        $request->only([
            'book_id' => 'required|exists:books,id',
            'user_id' => 'required|exists:users,id',
            'content' => 'required',
        ]);

        $commentary = new Commentaries([
            'book_id' =>  $request->book_id,
            'user_id' => $request->user_id,
            'content' =>  $request->content,
        ]);

        $commentary->save();

        return response()->json(['message'=>'the comment is save','comment'=>$commentary], 201);
    }

    /**
     * Afficher un commentaire spécifique.
     */
    public function show($id)
    {
        $commentary = Commentaries::with(['book', 'user'])->find($id);

        if (!$commentary) {
            return response()->json(['message' => 'Commentary not found'], 404);
        }

        return response()->json($commentary, 200);
    }

    /**
     * Mettre à jour un commentaire spécifique.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'user_id' => 'required|exists:users,id',
            'content' => 'required',
        ]);

        $commentary = Commentaries::find($id);

        if (!$commentary) {
            return response()->json(['message' => 'Commentary not found'], 404);
        }

        $commentary->update($request->all());

        return response()->json($commentary, 200);
    }

    /**
     * Supprimer un commentaire spécifique.
     */
    public function destroy(string $id)
    {
        $commentary = Commentaries::find($id);

        if (!$commentary) {
            return response()->json(['message' => 'Commentary not found'], 404);
        }

        $commentary->delete();

        return response()->json(['message' => 'Commentary deleted successfully'], 200);
    }



    public function getCommentsByBook($bookId)
    {
        $commentaries = Commentaries::where('book_id', $bookId)
                                    ->with(['book', 'user'])
                                    ->orderBy('commentaries.created_at', 'desc')
                                    ->get();

        if ($commentaries->isEmpty()) {
            return response()->json(['message' => 'No commentaries found for the specified book.'], 404);
        }

        return response()->json(['comments'=>$commentaries], 200);
    }
}





    