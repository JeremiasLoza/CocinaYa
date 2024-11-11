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
import { IngredientPageComponent } from './components/ingredient-page/ingredient-page.component';
import { IngredientFilteringComponent } from './components/ingredient-filtering/ingredient-filtering.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomePageComponent,
    CategoryPageComponent,
    ListRecipesComponent,
    CardComponent,
    SearchRecipesComponent,
    RecipeDetailModalComponent,
    IngredientCardComponent,
    IngredientPageComponent,
    IngredientFilteringComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
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
