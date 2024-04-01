import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoginDetails } from './interfaces/login-details';
import { Observable } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RecipeComponent } from './pages/recipe/recipe/recipe.component';
import { LoggedInUser } from './interfaces/logged-in-user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    CommonModule, 
    LoginComponent, 
    FormsModule, 
    RecipeComponent, 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Second Breakfast';

  signedIn$: Observable<LoggedInUser>;

  constructor(public auth: AuthService) {
    this.signedIn$ = this.auth.signedIn$;
  }

  ngOnInit(){
    this.auth.isLoggedIn();
  }

  logout(){
    this.auth.logOut();
  }
}
