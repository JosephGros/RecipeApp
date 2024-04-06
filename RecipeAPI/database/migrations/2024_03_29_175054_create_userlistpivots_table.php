<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('userlistpivots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userlists_id')->constrained()->onDelete('cascade');
            $table->string('recipeId');
            $table->string('recipeLabel');
            $table->text('recipeIngredientLines');
            $table->string('recipeTotalTime');
            $table->text('recipeHealthLabels');
            $table->string('recipeco2Emissions');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('userlistpivots');
    }
};
