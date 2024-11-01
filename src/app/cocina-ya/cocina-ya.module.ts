import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { ListRecipesComponent } from './components/list-recipes/list-recipes.component';
import { CardComponent } from './components/card/card.component';



@NgModule({
  declarations: [
    HomePageComponent,
    CategoryPageComponent,
    ListRecipesComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HomePageComponent,
    CategoryPageComponent,
    ListRecipesComponent,
    CardComponent
  ]
})
export class CocinaYaModule { }
