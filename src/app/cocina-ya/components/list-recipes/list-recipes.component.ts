import { Component, Input, OnInit, } from '@angular/core';
import { RecipeListService } from '../../services/recipe-list.service';
import { Recipe } from '../../models/recipe';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.css']
})
export class ListRecipesComponent implements OnInit {
  filteredRecipes: Recipe[] = [];
  selectedRecipe : Recipe | null = null;
  selectedIndex : number | null = null;

  constructor(public recipesListService: RecipeListService) { }

  ngOnInit(): void {
    combineLatest(
      [
        this.recipesListService.recipes$,
        this.recipesListService.selectedIngredients$
      ]
    ).subscribe(
      (
        [
        recipes,
        selectedIngredients
        ]
      ) => {
        this.filteredRecipes = this.filterRecipes(recipes, selectedIngredients);
      }
    );
  }

  private filterRecipes(recipes : Recipe[], selectedIngredients : string[]) : Recipe[] {
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
    ].filter(ingredient => ingredient !== "");

  }

  openRecipeDetail(recipe:Recipe,index:number):void{
    this.selectedRecipe = recipe;
    this.selectedIndex = index;
  }

  closeModal():void{
    this.selectedRecipe = null;
    this.selectedIndex = null;
  }

}

