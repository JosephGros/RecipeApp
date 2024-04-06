<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Userlistpivot extends Model
{
    use HasFactory;

    protected $table = 'userlistpivots';
    protected $fillable = [
    'userlists_id', 'recipeId', 'recipeLabel', 
    'recipeIngredientLines', 'recipeTotalTime', 
    'recipeHealthLabels', 'recipeco2Emissions'];

    public function userlist(){
        return $this->belongsTo(Userlist::class);
    }
}
