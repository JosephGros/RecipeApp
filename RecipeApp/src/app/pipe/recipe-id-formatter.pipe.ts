import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recipeidformatter',
  standalone: true
})
export class RecipeIdFormatterPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    let recipeIdResult = value.replace("https://api.edamam.com/api/recipes/v2/","").split("?")[0];
    return recipeIdResult;
  }
}