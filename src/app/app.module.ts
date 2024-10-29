import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CardComponent } from './components/card/card.component';
import { ListRecipesComponent } from './components/list-recipes/list-recipes.component';




@NgModule({
  declarations: [
    NavigationBarComponent,
    AppComponent,
    HomePageComponent,
    CardComponent,
    ListRecipesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
