import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RecipeComponent } from './pages/recipe/recipe/recipe.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { authGuard } from './guard/auth.guard';
import { UserlistComponent } from './pages/lists/userlist/userlist.component';
import { RecipesearchComponent } from './pages/search/recipesearch/recipesearch.component';
import { HomepageComponent } from './pages/home/homepage/homepage.component';
import { ListsComponent } from './pages/lists/userlists/lists/lists.component';
import { CreateComponent } from './pages/lists/createlist/create/create.component';
import { UpdateComponent } from './pages/lists/updatelist/update/update.component';

export const routes: Routes = [
    {path: '', component: HomepageComponent },
    {path: 'signin', component: LoginComponent },
    {path: 'logout', component: LoginComponent },
    {path: 'recipes', component: RecipeComponent },
    {path: 'register', component: RegisterComponent },
    {path: 'recipesearch', component: RecipesearchComponent },
    {path: 'recipe/:id', component: RecipeComponent },
    {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
    {path: 'mylists', component: ListsComponent, canActivate: [authGuard]},
    {path: 'createlist', component: CreateComponent, canActivate: [authGuard]},
    {path: 'updatelist', component: UpdateComponent, canActivate: [authGuard]},
    {path: 'userlist', component: UserlistComponent, canActivate: [authGuard]},
];
