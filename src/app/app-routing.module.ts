import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './cocina-ya/components/home-page/home-page.component';
import { CategoryPageComponent } from './cocina-ya/components/category-page/category-page.component';
import { SearchRecipesComponent } from './cocina-ya/components/search-recipes/search-recipes.component';
import { RecipePageComponent } from './cocina-ya/components/recipe-page/recipe-page.component';

const routes: Routes = [
{ path: 'home', component: HomePageComponent },
{ path : 'category/:category' , component : CategoryPageComponent},
{ path: 'search/:name', component: SearchRecipesComponent },
{ path: 'recipe/:id', component: RecipePageComponent },
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: '**' , component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
