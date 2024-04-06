<?php

namespace App\Http\Controllers;

use App\Models\Userlistpivot;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function addRecipe(Request $request){
        $request->validate([
            'userlists_id' => 'required|string',
            'recipeId' => 'required',
            'recipeLabel' => 'required|string', 
            'recipeIngredientLines' => 'required|array',
            'recipeIngredientLines.*' => 'string',
            'recipeTotalTime' => 'required', 
            'recipeHealthLabels' => 'required|array', 
            'recipeHealthLabels.*' => 'string', 
            'recipeco2Emissions' => 'required|string'
        ]);

        $addRecipe = new Userlistpivot();
        $addRecipe->userlists_id = $request->userlists_id;
        $addRecipe->recipeId = $request->recipeId;
        $addRecipe->recipeLabel = $request->recipeLabel;
        $addRecipe->recipeIngredientLines = json_encode($request->recipeIngredientLines);
        $addRecipe->recipeTotalTime = $request->recipeTotalTime;
        $addRecipe->recipeHealthLabels = json_encode($request->recipeHealthLabels);
        $addRecipe->recipeco2Emissions = $request->recipeco2Emissions;
        

        if($addRecipe->save()){
            return response()->json(['message' => 'Recipe added!'
        ], 200);
        } else {
            return response()->json(['message' => 'Something went wrong.'
        ], 500);
        }
    }

    public function removeRecipe(string $id, string $recipeId){

        $userlist = Userlistpivot::find($id);
        
        if($userlist){

            $recipe = $userlist->where('recipeId', $recipeId)->first();

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
