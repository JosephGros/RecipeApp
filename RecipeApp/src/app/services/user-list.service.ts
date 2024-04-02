import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Getlists } from '../interfaces/getlists';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private baseUrl = 'https://secondbreakfastapi.onrender.com/api/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 
    }),
  }

  constructor(private http: HttpClient) { }

  allLists(userId: Getlists){
    let url = this.baseUrl+'lists' + userId;
    return this.http.post<Getlists>(url, this.httpOptions);
  }

  createList(create: Getlists){
    let url = this.baseUrl+'create/list' + '&title=' + create.title + '&user_id=' + create.userId;
    return this.http.post(url, this.httpOptions);
  }

  showList(show: Getlists){
    let url = this.baseUrl+'list/recipes/' + show.listId;
    return this.http.post(url, this.httpOptions);
  }

  updateList(update: Getlists){
    let url = this.baseUrl+'update/list/' + update.listId;
    return this.http.post(url, this.httpOptions);
  }

  deleteList(listDelete: Getlists){
    let url = this.baseUrl+'delete/list/' + listDelete.listId;
    return this.http.post(url, this.httpOptions);
  }

  addRecipe(recipeAdd: Getlists){
    let url = this.baseUrl+'add/recipe' + '&recipeId=' + recipeAdd.recipeId + '&userlists_id=' + recipeAdd.listId;
    return this.http.post(url, this.httpOptions);
  }

  removeRecipe(recipeRemove: Getlists){
    let url = this.baseUrl+'add/recipe' + '&listId=' + recipeRemove.listId + '&recipeId=' + recipeRemove.recipeId;
    return this.http.post(url, this.httpOptions);
  }
}
