import { Component, Input,  } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.css']
})
export class ListRecipesComponent  {
 

  @Input() recipesList : Recipe [] = [];

  constructor(private recipeService : RecipeService, private route : ActivatedRoute){};



}