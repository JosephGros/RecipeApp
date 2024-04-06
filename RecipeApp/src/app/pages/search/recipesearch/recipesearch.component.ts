import { Component } from '@angular/core';
import { Recipe } from '../../../interfaces/recipe';
import { RecipeService } from '../../../services/recipe.service';
import { FormsModule } from '@angular/forms';
import { RecipeIdFormatterPipe } from '../../../pipe/recipe-id-formatter.pipe';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserListService } from '../../../services/user-list.service';
import { AuthService } from '../../../services/auth.service';
import { LoggedInUser } from '../../../interfaces/logged-in-user';
import { Observable } from 'rxjs';
import { Alluserlists } from '../../../interfaces/alluserlists';
import { AsyncPipe } from '@angular/common';
import { Recipedropdown } from '../../../interfaces/recipedropdown';
import { Listcontent } from '../../../interfaces/listcontent';

@Component({
  selector: 'app-recipesearch',
  standalone: true,
  imports: [FormsModule, RecipeIdFormatterPipe, RouterLink, AsyncPipe],
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

  signedIn$: Observable<LoggedInUser>;
  listDropdown: boolean = false;
  removeDropdown: boolean = false;
  userId: any;
  selectedListId: string = '';
  selectedRecipe: Recipe | null = null;
  recipesWithDropdown: Recipedropdown[] = [];
  listsWithRecipe: Alluserlists[] = [];
  listsWithoutRecipe: Alluserlists[] = [];
  inList: boolean = false;
  dropdown = false;

  listArray?: Alluserlists[];
  content?: Listcontent[];

  recipes?: Recipe[];

  searchterm = '';
  cuisineType = '';
  mealType = '';
  dishType = ''; 
  co2 = '';
  loading = false;
  error = '';


  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute,
    private list: UserListService, private auth: AuthService){
      this.signedIn$ = this.auth.signedIn$;
    }

  async ngOnInit() {
    this.userId = this.auth.userInfo?.id;
    this.route.queryParams.subscribe(params => {
      this.searchterm = params['searchterm'] || '';
      this.cuisineType = params['cuisineType'] || '';
      this.mealType = params['mealType'] || '';
      this.dishType = params['dishType'] || '';
      this.co2 = params['co2'] || '';
    });
    this.searchRecipe();
    if (this.userId) {
      try {
        await this.getAllLists();
      }catch (error) {
        console.error('Error while getting lists:', error);
      }
      
    } else {
      console.error('User ID not found.');
    }
  }

  filterDropdown(){
    this.dropdown = !this.dropdown;
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
      let recipesWithDropdown: Recipedropdown[] = [];
      recipesWithDropdown = result.hits.map((item: {recipe: {label: any; image: any; ingredientLines: any; totalTime: any; healthLabels: any; co2EmissionsClass: any; }; _links: { self: { href: any; }; }; }) => {
        return {
          recipe: {
          label: item.recipe.label,
          image: item.recipe.image,
          ingredientLines: item.recipe.ingredientLines,
          totalTime: item.recipe.totalTime,
          healthLabels: item.recipe.healthLabels,
          co2EmissionsClass: item.recipe.co2EmissionsClass,
          selfref: item._links.self.href,
        },
        listDropdown: false,
      };
      });
      console.table(recipesWithDropdown);
      this.recipesWithDropdown = recipesWithDropdown;
      this.loading = false;
    }, 
    error: (error) => {
      console.error('Error fetching recipes: ', error);
      this.loading = false;
      this.error = "Failed to fetch recipes. Please try again later.";
    }
  });
  }

  noResults(){
    if(this.recipesWithDropdown.length <= 0){
      this.error = "There are no recipes matching your search...";
    } else {
      this.error = "";
    }
  }

  //Add and remove recipe from lists functions

  checkRecipeList(){
    this.listsWithRecipe = [];
    this.listsWithoutRecipe = [];

    if(this.recipesWithDropdown && this.listArray){
      console.log('Hello im checkRecipeList under first If');
      this.listArray.forEach(list => {
        const hasRecipe = this.recipesWithDropdown.some(recipeDropdown => this.isRecipeInList(list.id, recipeDropdown.recipe));
        console.log('Hello im checkRecipeList', hasRecipe);
        if(hasRecipe) {
          this.listsWithRecipe.push(list);
        } else {
          this.listsWithoutRecipe.push(list);
        }
      })
      
      this.inList = this.listsWithRecipe.length > 0;
      console.log(this.inList);
    }
  }

  isRecipeInList(listId: any, recipe: Recipe): boolean{
    if(this.content){
      const recipeFormatted = new RecipeIdFormatterPipe().transform(recipe.selfref);
      console.log('From isRecipeInList()', this.content);
      return this.content.some(listItem => listItem.userlists_id === listId && listItem.recipeId === recipeFormatted);
    }
    return false;
  }

  toggleListOptions(recipe: Recipedropdown) {
    recipe.listDropdown = !this.listDropdown;
    this.listArray?.forEach(list => {
      this.getAllContent(list.id);
    })
  }

  toggleRemoveOptions() {
    this.removeDropdown = true;
  }

  recipeAdd(userlists_id: string, recipe: Recipe){
    const recipeFormatted = new RecipeIdFormatterPipe().transform(recipe.selfref);
    this.list.addRecipe(
      userlists_id,
      recipeFormatted,
      recipe.label,
      recipe.ingredientLines,
      recipe.totalTime, 
      recipe.healthLabels,
      recipe.co2EmissionsClass
      ).subscribe({
        next: (response) => {
          console.log('Recipe added: ', response);
        },
        error: (error) => {
          console.error('Error adding recipe:', error);
        }
      })
  }

  // recipeRemove(userlists_id: string, recipeId: string){
  //   const recipeFormatted = new RecipeIdFormatterPipe().transform(recipeId);
  //   this.list.removeRecipe(userlists_id, recipeFormatted).subscribe({
  //     next: (response) => {
  //       console.log('Recipe removed: ', response);
  //     },
  //     error: (error) => {
  //       console.error('Error removing recipe: ', error);
  //     }
  //   })
  // }
  
  async getAllLists(){
    this.list.allLists(this.userId).subscribe({
      next: (result: Alluserlists[]) => {
        console.log(result);
        let listArray: Alluserlists[] = [];
        listArray = result.map((item: Alluserlists) => {
          return {
            id: item.id,
            title: item.title,
            created_at: item.created_at
          }
        });
        this.listArray = listArray;
        for(const list of listArray){
          this.getAllContent(list.id);
        }
        this.loading = false;
        console.log(listArray);
      },
      error: (error: any) => {
        this.error = "There are no lists connected to your account. Create your first list!";
        this.loading = false;
        console.log(error);
      }
    })
  }

  async getAllContent(listId: string){
    this.loading = true;
    this.list.showList(listId).subscribe({
      next: (result: Listcontent[]) => {
        console.log(result);
        let content: Listcontent[] = [];
        content = result.map((item: Listcontent) => {
          return {
            id: item.id,
            userlists_id: item.userlists_id,
            recipeId: item.recipeId,
            recipeLabel: item.recipeLabel,
            recipeIngredientLines: item.recipeIngredientLines,
            recipeTotalTime: item.recipeTotalTime, 
            recipeHealthLabels: item.recipeHealthLabels,
            recipeco2Emissions: item.recipeco2Emissions,
            created_at: item.created_at
          }
        });
        this.content = content;
        this.loading = false;
        console.log(content);
      },
      error: (error: any) => {
        this.loading = false;
        this.error = "There are no recipes in your list.";
        console.log(error);
      }
    })
    this.checkRecipeList();
  }

}
