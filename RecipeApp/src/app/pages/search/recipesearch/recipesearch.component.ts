import { Component } from '@angular/core';
import { Recipe } from '../../../interfaces/recipe';
import { RecipeService } from '../../../services/recipe.service';
import { FormsModule } from '@angular/forms';
import { RecipeIdFormatterPipe } from '../../../pipe/recipe-id-formatter.pipe';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipesearch',
  standalone: true,
  imports: [FormsModule, RecipeIdFormatterPipe, RouterLink],
  templateUrl: './recipesearch.component.html',
  styleUrl: './recipesearch.component.css'
})
export class RecipesearchComponent {

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
  co2Classes: string[] = [
    "A+", "A", "B", "C", "D", "E", "F", "G"
  ];
  //A%2B för A+


  recipes?: Recipe[];

  searchterm = '';
  cuisineType = '';
  mealType = '';
  dishType = ''; 
  co2 = '';
  loading = false;
  error = '';

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute){}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchterm = params['searchterm'] || '';
      this.cuisineType = params['cuisineType'] || '';
      this.mealType = params['mealType'] || '';
      this.dishType = params['dishType'] || '';
      this.co2 = params['co2'] || '';
    });
    this.searchRecipe();
  }

  searchRecipe(){
    this.loading = true;

    const queryParams: any = {};
    if (this.searchterm) queryParams.searchterm = this.searchterm;
    if (this.cuisineType) queryParams.cuisineType = this.cuisineType;
    if (this.mealType) queryParams.mealType = this.mealType;
    if (this.dishType) queryParams.dishType = this.dishType;
    if (this.co2) queryParams.co2 = this.co2;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });

    this.recipeService.getRecipes(this.searchterm, this.cuisineType, this.mealType, this.dishType, this.co2).subscribe({
      next: (result) => {
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
      this.recipes = recipes;
      this.loading = false;
      if(this.recipes.length < 1){
        this.error = "There are no recipes matching your search...";
      } else {
        this.error = "";
      }
    }, 
    error: (error) => {
      console.error('Error fetching recipes: ', error);
      this.loading = false;
      this.error = "Failed to fetch recipes. Please try again later.";
    }
  });
  }

}
