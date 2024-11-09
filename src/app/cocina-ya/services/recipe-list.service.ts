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
  
  filterRecipesByIngredients(recipes : Recipe[], selectedIngredients : string[]) : Recipe[] {
    if(selectedIngredients.length === 0){
      return recipes;
    }


    return recipes.filter(recipe=>
      selectedIngredients.every(selectedIngredient =>
        this.getRecipeIngredients(recipe).includes(selectedIngredient)
      )
    );
  }

  getRecipeIngredients(recipe: Recipe): string[] {
    return [
      recipe.strIngredient1, recipe.strIngredient2, recipe.strIngredient3,
      recipe.strIngredient4, recipe.strIngredient5, recipe.strIngredient6,
      recipe.strIngredient7, recipe.strIngredient8, recipe.strIngredient9,
      recipe.strIngredient10, recipe.strIngredient11, recipe.strIngredient12,
      recipe.strIngredient13, recipe.strIngredient14, recipe.strIngredient15,
      recipe.strIngredient16, recipe.strIngredient17, recipe.strIngredient18,
      recipe.strIngredient19, recipe.strIngredient20
    ].filter(ingredient => ingredient !== "" && ingredient !== null);

  }
}
