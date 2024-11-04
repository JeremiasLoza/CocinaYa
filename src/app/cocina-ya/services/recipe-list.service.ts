import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeListService {
  
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);
  private selectedIngredientesSubject = new BehaviorSubject<string[]> ([]);
  
  recipes$ = this.recipesSubject.asObservable();
  selectedIngredients$ = this.selectedIngredientesSubject.asObservable();

  setRecipes(recipes : Recipe[]): void {
    this.recipesSubject.next(recipes);
  }

  setSelectedIngredients(ingredients:string[]):void{
    this.selectedIngredientesSubject.next(ingredients);
  }
  
}
