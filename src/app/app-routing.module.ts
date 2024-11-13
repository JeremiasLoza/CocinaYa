import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './cocina-ya/components/home-page/home-page.component';
import { CategoryPageComponent } from './cocina-ya/components/category-page/category-page.component';
import { SearchRecipesComponent } from './cocina-ya/components/search-recipes/search-recipes.component';
import { IngredientPageComponent } from './cocina-ya/components/ingredient-page/ingredient-page.component';
import { FavoritesPageComponent } from './cocina-ya/components/favorites-page/favorites-page.component';

const routes: Routes = [
{ path: 'home', component: HomePageComponent },
{ path : 'category/:category' , component : CategoryPageComponent},
{ path: 'search/:name', component: SearchRecipesComponent },
{path:'ingredient/:name', component:IngredientPageComponent},
{path:'favorites', component:FavoritesPageComponent},
{ path: '**' , component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
