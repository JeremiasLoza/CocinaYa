import { Component, Input, OnInit, } from '@angular/core';
import { RecipeListService } from '../../services/recipe-list.service';
import { Recipe } from '../../models/recipe';
import { combineLatest } from 'rxjs';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.css']
})
export class ListRecipesComponent implements OnInit {
  filteredRecipes: Recipe[] = [];
  selectedRecipe : Recipe | null = null;
  selectedIndex !: number ;
  favoriteRecipeIds: string[] = [];
  constructor(public recipesListService: RecipeListService,private favoriteService : FavoritesService) { }

  ngOnInit(): void {

    this.favoriteService.getFavorites('1'/*USER ID*/).subscribe(response=>{
      if(response){
        this.favoriteRecipeIds = response.recipeIds;
      }
    })

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
        this.filteredRecipes = this.recipesListService.filterRecipesByIngredients(recipes, selectedIngredients);
      }
    );
  }

  isRecipeFavorite(recipeId : string):boolean{
    return this.favoriteRecipeIds.includes(recipeId);
  }

  openRecipeDetail(recipe:Recipe,index:number):void{
    this.selectedRecipe = recipe;
    this.selectedIndex = index;
  }

  closeModal():void{
    this.selectedRecipe = null;
    this.selectedIndex = -1;
  }

}

