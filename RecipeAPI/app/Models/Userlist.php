<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Userlist extends Model
{
    use HasFactory;

    protected $table = 'userlists';
    protected $fillable = ['user_id', 'title'];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
