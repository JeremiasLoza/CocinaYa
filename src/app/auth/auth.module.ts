import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CocinaYaModule } from '../cocina-ya/cocina-ya.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CocinaYaModule,
    RouterModule
  ]
})
export class AuthModule { }
