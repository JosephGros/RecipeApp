import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, Observable, throwError, BehaviorSubject, map } from 'rxjs';
import { LoginDetails } from '../interfaces/login-details';
import { User } from '../interfaces/user';
import { Register } from '../interfaces/register';
import { LoggedInUser } from '../interfaces/logged-in-user';
import { Router } from '@angular/router';

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

  private signedIn = new BehaviorSubject<LoggedInUser>({
    user: undefined,
    loginState: false
  });
  signedIn$ = this.signedIn.asObservable();

  private baseUrl = 'http://localhost:8000/api/';
  // https://secondbreakfastapi.onrender.com/api/

  userInfo: User | null = null;
  private token: string = '';
  userName: string = '';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 
    }),
  }

  constructor(private http:HttpClient, private router: Router) {}

  updateLoginState(loginState: LoggedInUser) {
    this.signedIn.next(loginState);
  }

  loginStatus() {
    return this.signedIn.value.loginState;
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
          this.updateLoginState({
            user: result.user,
            loginState: true
          });
          sessionStorage.setItem('token', this.token);
          sessionStorage.setItem('sessionUser', JSON.stringify(this.userInfo));
          this.setUserName(result.user.username);
          this.setUserInfo(result.user);
          this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + result.token);
          return true;
        }),
        catchError(error => {
          console.error('Login failed: ', error);
          return throwError(() => new Error('Invalid email or password. Please try again!'));
        })
      );
  }

  logOut(){
    this.http.post<ResultData>(this.baseUrl+'logout', {}, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(result => {
        console.log(result);
        this.updateLoginState({
          user: undefined,
          loginState: false
        });
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('sessionUser');
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer ");
        this.router.navigate(['']);
      })
  }

  isLoggedIn() {
    const checkToken = sessionStorage.getItem('token');
    const checkUser = sessionStorage.getItem('sessionUser');
    if (checkToken && checkUser){
      this.token = checkToken;
      this.updateLoginState({
        user: JSON.parse(checkUser),
        loginState: true
      });
      this.setUserInfo(JSON.parse(checkUser));
      this.token = checkToken;
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + checkToken);
    }
    console.log (checkToken);
    console.log (checkUser);
  }

  getCurrentToken(): string | null {
    return this.token;
  }

  setUserName(name: string){
    this.userName = name;
  }

  setUserInfo(info: any){
    this.userInfo = info;
    return this.userInfo;
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
