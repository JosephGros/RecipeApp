<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\UserlistController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Login user
Route::post('login', [AuthController::class, 'login']);
// Register user
Route::post('register', [AuthController::class, 'register']);

// If logged in...
Route::group(['middleware' => 'auth:sanctum'], function() {
    // Logout user
    Route::post('logout', [AuthController::class, 'logout']);
    // Get specific user details
    Route::get('getuser/{id}', [AuthController::class, 'getUser']);
    
    // TODO: CRUD for recipe lists

    Route::post('create/list', [UserlistController::class, 'store']);
    Route::post('lists/{id}', [UserlistController::class, 'index']);
    Route::post('list/recipes/{id}', [UserlistController::class, 'showRecipes']);
    Route::post('update/list/{id}', [UserlistController::class, 'update']);
    Route::post('delete/list/{id}', [UserlistController::class, 'destroy']);

    Route::post('add/recipe', [RecipeController::class, 'addRecipe']);
    Route::post('remove/recipe/{listId}/{recipeId}', [RecipeController::class, 'removeRecipe']);
});
