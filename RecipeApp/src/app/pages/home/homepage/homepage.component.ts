import { Component } from '@angular/core';
import { Recipe } from '../../../interfaces/recipe';
import { RecipeService } from '../../../services/recipe.service';
import { RecipeIdFormatterPipe } from '../../../pipe/recipe-id-formatter.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RecipeIdFormatterPipe, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  cuisineTypes: string[] = [
    "American", "Asian", "British", "Caribbean", "Central Europe", "Chinese", "Eastern Europe", "French", 
    "Indian", "Italian", "Japanese", "Kosher", "Mediterranean", "Mexican", "Middle Eastern", "Nordic",
    "South American", "South East Asian"
  ];
  mealTypes: string[] = [
    "Breakfast", "Dinner", "Lunch", "Snack", "Teatime"
  ];
  dishTypes: string[] = [
    "Biscuits and cookies", "Bread", "Cereals", "Condiments and sauces", "Desserts", "Drinks",
    "Main course", "Pancake", "Preps", "Preserve", "Salad", "Sandwiches", "Side dish", "Soup",
    "Starter", "Sweets"
  ];

  cuisineTypeRecipes?: Recipe[];
  mealTypeRecipes?: Recipe[];
  dishTypeRecipes?: Recipe[];

  cuisineType = '';
  mealType = '';
  dishType = '';

  constructor(private recipeService: RecipeService) {}

  ngOnInit(){
    const randomCuisine = Math.floor(Math.random() * this.cuisineTypes.length);
    const randomMealType = Math.floor(Math.random() * this.mealTypes.length);
    const randomDishType = Math.floor(Math.random() * this.dishTypes.length);

    this.cuisineType = this.cuisineTypes[randomCuisine];
    this.mealType = this.mealTypes[randomMealType];
    this.dishType = this.dishTypes[randomDishType];

    this.searchRecipes(this.cuisineType, '', '', 'cuisineTypeRecipes');
    this.searchRecipes('', this.mealType, '', 'mealTypeRecipes');
    this.searchRecipes('', '', this.dishType, 'dishTypeRecipes');
  }

  searchRecipes(cuisineType: string, mealType: string, dishType: string, searchArray: 'cuisineTypeRecipes' | 'mealTypeRecipes' | 'dishTypeRecipes'){

    this.recipeService.getRecipes(cuisineType, mealType, dishType).subscribe((result) => {
      console.log(result);
      let recipes: Recipe[] = [];
      recipes = result.hits.map((item: {recipe: {label: any; image: any; ingredientLines: any; totalTime: any; healthLabels: any; co2EmissionsClass: any; }; _links: { self: { href: any; }; }; }) => {
        return {
          label: item.recipe.label,
          image: item.recipe.image,
          ingredientLines: item.recipe.ingredientLines,
          totalTime: item.recipe.totalTime,
          healthLabels: item.recipe.healthLabels,
          co2EmissionsClass: item.recipe.co2EmissionsClass,
          selfref: item._links.self.href,
        };
      });
      console.table(recipes);
      
      switch(searchArray){
        case 'cuisineTypeRecipes':
          this.cuisineTypeRecipes = recipes;
        break;
        case 'mealTypeRecipes':
          this.mealTypeRecipes = recipes;
        break;
        case 'dishTypeRecipes':
          this.dishTypeRecipes = recipes;
        break;
      }
    });
  }

}
