import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CardComponent } from './components/card/card.component';
import { ListRecipesComponent } from './components/list-recipes/list-recipes.component';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CardComponent,
    ListRecipesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
