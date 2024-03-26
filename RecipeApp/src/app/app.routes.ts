import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RecipeComponent } from './pages/recipe/recipe/recipe.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {path: 'signin', component: LoginComponent },
    {path: 'logout', component: LoginComponent },
    {path: 'recipes', component: RecipeComponent },
    {path: 'register', component: RegisterComponent },
];
