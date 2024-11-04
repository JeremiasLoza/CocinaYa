import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { RouterModule } from '@angular/router';
import { IngredientFilteringComponent } from './components/ingredient-filtering/ingredient-filtering.component';
import {FormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    NavigationBarComponent,
    IngredientFilteringComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports : [
    NavigationBarComponent,
    IngredientFilteringComponent
  ]
})
export class SharedModule { }
