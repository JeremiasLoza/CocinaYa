import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    NavigationBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports : [
    NavigationBarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
