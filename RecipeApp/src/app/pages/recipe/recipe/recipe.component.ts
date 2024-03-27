import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Recipe } from '../../../interfaces/recipe';
import { RecipeService } from '../../../services/recipe.service';
import { AppComponent } from '../../../app.component';
import { BackBtnService } from '../../../services/back-btn.service';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [AppComponent],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  id: any | null = null;
  recipeId?: Recipe;
  loading = false;
  error = '';

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private back: BackBtnService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
        if (this.id){
          this.theRecipe();
        }
    });
  }

  backBtn() {
    this.back.backFn();
  }

  theRecipe(){
    this.loading = true;
    this.recipeService.getRecipe(this.id).subscribe({
      next: (result) => {
      console.log(result);
      let recipe: Recipe = {
          label: result.recipe.label,
          image: result.recipe.image,
          ingredientLines: result.recipe.ingredientLines,
          totalTime: result.recipe.totalTime,
          healthLabels: result.recipe.healthLabels,
          co2EmissionsClass: result.recipe.co2EmissionsClass,
          selfref: result._links.self.href,
      };
      console.table(recipe);
      this.recipeId = recipe;
      this.loading = false;
      if(!recipe.label){
        this.error = "There are no recipes matching your search...";
      }
      },
      error: (error) => {
        console.error('Error fetching recipe: ', error);
        this.loading = false;
        this.error = "Failed to fetch recipe. Please try again later.";
      },
    });
      return this.recipeId;
  }
}
