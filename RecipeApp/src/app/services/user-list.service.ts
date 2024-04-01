import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private baseUrl = 'https://secondbreakfastapi.onrender.com/api/';

  constructor() { }
}
