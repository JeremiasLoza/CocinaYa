import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './cocina-ya/components/home-page/home-page.component';
import { CategoryPageComponent } from './cocina-ya/components/category-page/category-page.component';
import { SearchRecipesComponent } from './cocina-ya/components/search-recipes/search-recipes.component';
import { IngredientPageComponent } from './cocina-ya/components/ingredient-page/ingredient-page.component';
import { UserPageComponent } from './cocina-ya/components/user-page/user-page.component';
import { EditUserComponent } from './cocina-ya/components/edit-user/edit-user.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { DashboardComponent } from './auth/components/dashboard/dashboard.component';
import { FavoritesPageComponent } from './cocina-ya/components/favorites-page/favorites-page.component';


const routes: Routes = [
{ path: 'home', component: HomePageComponent },
{ path : 'category/:category' , component : CategoryPageComponent},
{ path: 'search/:name', component: SearchRecipesComponent },
{path:'ingredient/:name', component:IngredientPageComponent},
{path: 'viewUser', component:UserPageComponent},
{path :'edit-user/:id', component: EditUserComponent},
{ path: 'login', component: LoginComponent},
{ path: 'register', component: RegisterComponent},
{ path: 'dashboard', component: DashboardComponent},
{path:'favorites', component:FavoritesPageComponent},
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{path: 'profile', component: UserPageComponent},
{ path: '**' , component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
