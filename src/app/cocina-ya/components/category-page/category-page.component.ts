import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../models/recipe';
import { Observer } from 'rxjs';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css'
})
export class CategoryPageComponent implements OnInit {
  constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

  recipeList: Recipe[] = [];
  category: string | null = "";

  ngOnInit(): void {

    const observer: Observer<any> = {
      next: (data) => {
        this.recipeList = data.meals || [];
        console.log(this.recipeList)
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => { console.log("Request completed") }
    }

    this.route.paramMap.subscribe((params) => {
      this.category = params.get("category");
      if (this.category) {
        this.categoryService.getRecipeByCategory(this.category).subscribe(observer);
      }
    })




  }


}
