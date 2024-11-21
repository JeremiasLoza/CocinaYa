import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observer, switchMap } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { RecipeListService } from '../../services/recipe-list.service';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css'
})
export class CategoryPageComponent implements OnInit {
  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private recipesListService: RecipeListService,private recipeService : RecipeService) { }
  
  category: string | null = "";

  ngOnInit(): void {

    const observer: Observer<any> = {
      next: (data) => {
        this.recipesListService.setRecipes(data);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => { console.log("Request completed") }
    }

    this.route.paramMap.subscribe((params) => {
      this.category = params.get("category");
      if (this.category) {
        this.categoryService.getRecipeIdsByCategory(this.category).pipe(
          switchMap(ids =>{
            const recipeRequests = ids.map(id => this.recipeService.getById(id))
            return forkJoin(recipeRequests);
          })
        ).subscribe(observer);
      }
    })
  }


}
