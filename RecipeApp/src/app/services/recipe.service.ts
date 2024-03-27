import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = 'https://api.edamam.com/api/recipes/v2?type=public';
  private app_key = '40ac272ced7ebd6f5cebe173902e5f5d';
  private app_id = '5a3a3a4a';

  private httpOptions = {
    headers: new HttpHeaders({
      'accept':'application/json',
      'Accept-language':'en'
    })
  }

  constructor(private http: HttpClient) { }

  getRecipes(searchterm="", cuisineType="", mealType="", dishType="", co2=""){
    let url = this.baseUrl + "&q=" + searchterm + "&app_id=" + this.app_id + "&app_key=" + this.app_key;

    if(cuisineType) {
      url += "&cuisine_type=" + cuisineType;
    }
    if(mealType) {
      url += "&mealType=" + mealType;
    }
    if(dishType) {
      url += "&dishType=" + dishType;
    }
    if(co2) {
      url += "&co2EmissionsClass=" + co2;
    }
    return this.http.get<any>(url, this.httpOptions);
  }

  getRecipe(id: string){
    let url = "https://api.edamam.com/api/recipes/v2/" + id + "?type=public" + "&app_id=" + this.app_id + "&app_key=" + this.app_key;
    return this.http.get<any>(url, this.httpOptions);
  }
}