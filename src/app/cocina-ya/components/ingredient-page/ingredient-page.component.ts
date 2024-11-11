import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { RecipeListService } from '../../services/recipe-list.service';
import { Recipe } from '../../models/recipe';
import { Ingredient } from '../../models/ingredient';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-ingredient-page',
  templateUrl: './ingredient-page.component.html',
  styleUrl: './ingredient-page.component.css'
})
export class IngredientPageComponent implements OnInit{

  ingredientName : string = ''
  recipeList : Recipe[] = [];
  allIngredients : Ingredient[] = []
  constructor(private rout : ActivatedRoute, private recipeService : RecipeService, private recipeListService : RecipeListService, private ingredientService : IngredientService){}
  
  ngOnInit(): void {
      this.ingredientService.getAllIngredients().subscribe(ingredients =>{
        this.allIngredients = ingredients.meals.map((ingredient : any) =>({
          ...ingredient,
          selected : false,
        }));        
      
        this.rout.params.subscribe(param => {
          this.ingredientName = param['name'];
          this.filter(this.ingredientName);
        })
      })
  }

  filter(ingredientName : string):void{
    this.allIngredients.forEach(ingredient => ingredient.selected = false);
    this.recipeService.getAllRecipes().subscribe(allRecipes =>{
    
      this.recipeList = allRecipes;
      this.recipeListService.setRecipes(this.recipeList);
    })

    
    const ingredient = this.allIngredients.find(ingredient => ingredient.strIngredient === ingredientName);
    if(ingredient)
    {
      ingredient.selected = true;
    }

    const selectedIngredients = this.allIngredients.filter(ingredient => ingredient.selected).map(ingredient => ingredient.strIngredient);
    this.recipeListService.setSelectedIngredients(selectedIngredients);
  }

}
