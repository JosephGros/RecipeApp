import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, Observable, throwError, BehaviorSubject, map } from 'rxjs';
import { LoginDetails } from '../interfaces/login-details';
import { User } from '../interfaces/user';
import { Register } from '../interfaces/register';

interface ResultData {
  token: string,
  user: User
}

interface RegisterDetails {

}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private signedIn = new BehaviorSubject<boolean>(false);
  signedIn$ = this.signedIn.asObservable();

  private baseUrl = 'http://127.0.0.1:8000/api/';

  // private token: string | null = null;

  userInfo: User | null = null;
  private token: string = '';
  userName: string = '';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  constructor(private http:HttpClient) {}

  private updateLoginState(loginState: boolean) {
    this.signedIn.next(loginState);
  }

  register(register: Register): Observable<ResultData>{
    return this.http.post<ResultData>(this.baseUrl+'register', register, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  login(loginDetails: LoginDetails): Observable<boolean> {
      return this.http.post<ResultData>(this.baseUrl+'login', loginDetails, this.httpOptions).pipe(
        map((result: ResultData) => {
          this.userInfo = result.user;
          this.token = result.token;
          this.userName = this.userInfo.username;
          console.log(result);
          this.updateLoginState(true);
          this.setUserName(result.user.username);
          this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + result.token);
          return true;
        }),
        catchError(error => {
          console.error('Login failed: ', error);
          return throwError('Invalid email or password. Please try again!');
        })
      );
  }

  logOut(){
    this.http.post<ResultData>(this.baseUrl+'logout', {}, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(result => {
        console.log(result);
        this.updateLoginState(false);
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer ");
      })
  }


  getCurrentToken(): string | null {
    return this.token;
  }

  setUserName(name: string){
    this.userName = name;
  }

  //add so the user uses controllers in backend for adding end deleting and creating lists and recipes!!!!

  private handleError(error: HttpErrorResponse){
    if (error.status === 404) {
      console.error('An error occured: ', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error
      );
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
