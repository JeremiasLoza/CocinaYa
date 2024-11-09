import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { RecipeService } from './recipe.service';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/';

  constructor(private http: HttpClient , private recipeService : RecipeService) { }

  getAllCategories() : Observable<any> {
    return this.http.get<any>(`${this.apiUrl}categories.php`);
  }

  getRecipeIdsByCategory(category: string | null): Observable<string[]> {
    return this.http.get<{ meals: { idMeal: string }[] }>(`${this.apiUrl}/filter.php?c=${category}`)
      .pipe(
        map(response => response.meals.map(meal => meal.idMeal))
      );
  }  

}
