import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { IngredientFilteringComponent } from './components/ingredient-filtering/ingredient-filtering.component';
import {FormsModule} from '@angular/forms'



@NgModule({
  declarations: [
    NavigationBarComponent,
    FooterComponent,
    IngredientFilteringComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports : [
    NavigationBarComponent,
    FooterComponent,
    IngredientFilteringComponent
  ]
})
export class SharedModule { }
