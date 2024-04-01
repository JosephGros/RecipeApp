<?php

namespace App\Http\Controllers;

use App\Models\Userlistpivot;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function addRecipe(Request $request){
        $request->validate([
            'recipeId' => 'required|string',
            'userlists_id' => 'required|string'
        ]);

        $addRecipe = new Userlistpivot();
        $addRecipe->recipe = $request->recipeId;
        $addRecipe->userlists_id = $request->userlists_id;

        if($addRecipe->save()){
            return response()->json(['message' => 'Recipe added!'
        ], 200);
        } else {
            return response()->json(['message' => 'Something went wrong.'
        ], 500);
        }
    }

    public function removeRecipe(string $listId, string $recipeId){

        $userlist = Userlistpivot::find($listId);
        
        if($userlist){

            $recipe = $userlist->where('recipe', $recipeId)->first();

            if($recipe){
                $recipe->delete();
                return response()->json(['message' => 'Recipe removed from list.'
            ], 200);
            } else {
                return response()->json(['message' => 'Recipe not found in list.'
            ], 404);
            }
        } else {
            return response()->json(['message' => 'List not found.']);
        }
    }
}
