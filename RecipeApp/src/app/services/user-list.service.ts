import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Getlists } from '../interfaces/getlists';
import { Title } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { Listcontent } from '../interfaces/listcontent';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private baseUrl = 'https://secondbreakfastapi.onrender.com/api/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    })
  }

  constructor(private http: HttpClient) { }

  allLists(userId: any): Observable<any>{
    let url = this.baseUrl+'lists/' + userId;
    let token = sessionStorage.getItem('token');
    if(token){
      console.log('Request headers: ', this.httpOptions.headers);
      return this.http.post(url, {}, this.httpOptions);
    } else {
      console.error('Token not found in session storage.');
      return of(null);
    }
  }

  createList(title="", userId=""): Observable<any> {
    let url = this.baseUrl+'create/list/' + title + '/' + userId; 
    let token = sessionStorage.getItem('token');
    if(token){
      console.log('Request headers: ', this.httpOptions.headers);
      return this.http.post(url, {}, this.httpOptions);
    } else {
      console.error('Token not found in session storage.');
      return of(null);
    }
  }

  showList(listId=""): Observable<any>{
    let url = this.baseUrl+'list/recipes/' + listId;
    let token = sessionStorage.getItem('token');
    if(token){
      console.log('Update request headers: ', this.httpOptions.headers);
      return this.http.post(url, {}, this.httpOptions);
    } else {
      console.error('Token not found in session storage.');
      return of(null);
    }
  }

  updateList(title="", listId="", userId=""): Observable<any>{
    let url = this.baseUrl+'update/list/' + title + '/' + listId + '/' + userId;
    let token = sessionStorage.getItem('token');
    if(token){
      console.log('Update request headers: ', this.httpOptions.headers);
      return this.http.post(url, { title: title, user_id: userId}, this.httpOptions);
    } else {
      console.error('Token not found in session storage.');
      return of(null);
    }
  }

  deleteList(listId: any): Observable<any>{
    let url = this.baseUrl+'delete/list/' + listId;
    let token = sessionStorage.getItem('token');
    if(token){
      console.log('Delete request headers: ', this.httpOptions.headers);
      console.log(this.http.post(url, {}, this.httpOptions));
      return this.http.post(url, {}, this.httpOptions);
    } else {
      console.error('Token not found in session storage.');
      return of(null);
    }
  }

  addRecipe(
    userlists_id = "", recipeId = "", recipeLabel = "", recipeIngredientLines = "",
    recipeTotalTime: number, recipeHealthLabels = "", recipeco2Emissions = ""): Observable<any>{
    let url = this.baseUrl+'add/recipe';
    let token = sessionStorage.getItem('token');
    if(token){
      console.log('Add recipe request headers: ', this.httpOptions.headers);
      console.log(this.http.post(url, {
          userlists_id: userlists_id,
          recipeId: recipeId,
          recipeLabel: recipeLabel,
          recipeIngredientLines: recipeIngredientLines,
          recipeTotalTime: recipeTotalTime, 
          recipeHealthLabels: recipeHealthLabels,
          recipeco2Emissions: recipeco2Emissions,
      }, this.httpOptions));
      return this.http.post(url, {
            userlists_id: userlists_id,
            recipeId: recipeId,
            recipeLabel: recipeLabel,
            recipeIngredientLines: recipeIngredientLines,
            recipeTotalTime: recipeTotalTime, 
            recipeHealthLabels: recipeHealthLabels,
            recipeco2Emissions: recipeco2Emissions,
      }, this.httpOptions);
    } else {
      console.error('Token not found in session storage.');
      return of(null);
    }
  }

  removeRecipe(id ="", recipeId =""): Observable<any> {
    let url = this.baseUrl+'remove/recipe/' + id + '/' + recipeId;
    let token = sessionStorage.getItem('token');
    if(token){
      console.log('Remove recipe request headers: ', this.httpOptions.headers);
      console.log(this.http.post(url, {}, this.httpOptions));
      return this.http.post(url, {}, this.httpOptions);
    } else {
      console.error('Token not found in session storage.');
      return of(null);
    }
  }
}
