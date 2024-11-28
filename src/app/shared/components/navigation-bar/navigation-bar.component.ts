import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../../cocina-ya/services/category.service';
import { Category } from '../../../cocina-ya/models/category';
import { Observer } from 'rxjs';
import { AuthLoginService } from '../../../cocina-ya/services/auth.login.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent implements OnInit {
  constructor(private categoryService: CategoryService, private authService: AuthLoginService) { }

  isLogged = false;
  searchText = '';

  categories: Category[] = [];

  ngOnInit() {
    
    const observer: Observer<any> = {
      next: (data) => {
        this.categories = data.categories;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => { console.log("Completed"); }
    }

    this.categoryService.getAllCategories().subscribe(observer);
    this.authService.isLoggedIn().subscribe(response => {
      this.isLogged = response;
    })

  }




}
