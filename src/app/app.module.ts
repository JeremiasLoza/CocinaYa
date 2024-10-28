import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
<<<<<<< HEAD
=======
import { CardComponent } from './card/card.component';
>>>>>>> 80d1cc4 (creo el componente tarjeta)

@NgModule({
  declarations: [
    NavigationBarComponent,
<<<<<<< HEAD
    AppComponent
=======
    AppComponent,
    CardComponent
>>>>>>> 80d1cc4 (creo el componente tarjeta)
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
