import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';

const routes: Routes = [
{ path: 'home', component: HomePageComponent },
{ path : 'category/:category' , component : CategoryPageComponent},
{ path: '**' , component: HomePageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
