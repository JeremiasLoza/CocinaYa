import { Component, OnInit} from '@angular/core';
import { CategoryService } from '../category.service';
import {Category} from '../models/category'
import { Observer } from 'rxjs';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent implements OnInit{
  isLogged = false;
  
  categories: Category[] = [];
  constructor(private categoryService : CategoryService){}

  ngOnInit(){
    const observer : Observer<any> = {
      next : (data)=>{
        this.categories = data.categories;
      },
      error : (error)=>{
        console.log(error);
      },
      complete: ()=>{console.log("Completed");}
    }

    this.categoryService.getAllCategories().subscribe(observer);
  }


}
