<?php

namespace App\Http\Controllers;

use App\Models\Userlist;
use App\Models\Userlistpivot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        if(Userlist::where('user_id', $id)->exists()) {
            $userlists = Userlist::where('user_id', $id)->get()->toJson(JSON_PRETTY_PRINT);
            return response($userlists, 200);
        } else {
            return response()->json([
                'message' => 'No lists found.'
            ], 404);
        };
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(string $title, string $user_id)
    {   
        $userL = new Userlist();
        $userL->title = $title;
        $userL->user_id = $user_id;

        if($userL->save()){
            return response()->json(['message' => 'List created!'
        ], 200);
        } else {
            return response()->json(['message' => 'Something went wrong.'
        ], 500);
        }

    }

    /**
     * Display the specified resource.
     */
    public function showRecipes(string $id)
    {
        if(Userlistpivot::where('userlists_id', $id)->exists()) {
            $userlist = Userlistpivot::where('userlists_id', $id)->get()->toJson(JSON_PRETTY_PRINT);
            return response($userlist, 200);
        } else {
            return response()->json([
                'message' => 'No lists found.'
            ], 404);
        };
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $title, string $listId, string $user_id)
    {
        $request->validate([
            'title' => 'required|string',
            'user_id' => 'required'
        ]);

        $userList = Userlist::find($listId);

        if(!$userList){
            return response()->json(['message' => 'List not found.'], 404);
        }

            $userList->title = $request->input('title', $userList->title);
            $userList->user_id = $request->input('user_id', $userList->user_id);
    
            if($userList->save()){
                return response()->json(['message' => 'List updated!'
            ], 200);
            } else {
                return response()->json(['message' => 'Something went wrong.'
            ], 500);
            }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if(Userlist::where('id', $id)->exists()) {
            
            $listDelete = Userlist::find($id);
            $listDelete->delete();
            return response()->json(['message' => 'List deleted!'
        ], 200);
        } else {
            return response()->json(['message' => 'Something went wrong.'
        ], 500);
        };
    }
}
