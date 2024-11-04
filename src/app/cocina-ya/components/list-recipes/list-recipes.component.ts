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
        this.recipesListService.getRecipeIngredients(recipe).includes(selectedIngredient)
      )
    );
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

