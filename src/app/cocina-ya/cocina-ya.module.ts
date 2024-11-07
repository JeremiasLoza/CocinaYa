import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { ListRecipesComponent } from './components/list-recipes/list-recipes.component';
import { CardComponent } from './components/card/card.component';
import { RouterLink, RouterModule } from '@angular/router';
import { SearchRecipesComponent } from './components/search-recipes/search-recipes.component';
import { RecipeDetailModalComponent } from './components/recipe-detail-modal/recipe-detail-modal.component';
import { IngredientCardComponent } from './components/ingredient-card/ingredient-card.component';



@NgModule({
  declarations: [
    HomePageComponent,
    CategoryPageComponent,
    ListRecipesComponent,
    CardComponent,
    SearchRecipesComponent,
    RecipeDetailModalComponent,
    IngredientCardComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports:[
    HomePageComponent,
    CategoryPageComponent,
    ListRecipesComponent,
    CardComponent,
    RecipeDetailModalComponent
  ]
})
export class CocinaYaModule { }
