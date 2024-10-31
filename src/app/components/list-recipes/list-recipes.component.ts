import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.css']
})
export class ListRecipesComponent implements OnInit {
 

  recipesList : Recipe [] = [];

  constructor(private recipeService : RecipeService, private route : ActivatedRoute){};

  ngOnInit(): void {

    this.recipeService.getRandomRecipes().subscribe(
      (data) => {
        this.recipesList = data || [];
        console.log(this.recipesList);
      },
      (error) => {
        console.error('Error occurred:', error); // Manejo de errores
      }
    );

  }

}