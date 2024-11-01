import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'] // Cambia 'styleUrl' por 'styleUrls'
})
export class HomePageComponent implements OnInit {

  recipeList: Recipe[] = [];

  constructor(private service: RecipeService) {}

  ngOnInit(): void {
    this.getRecipesRamdom(20);
  }

  getRecipesRamdom(cant: number) {
    const uniquesRecipe = new Set<string>();

    const fetchRecipes = () => {
      this.service.get1Ramdom().subscribe(
        (response) => {
          const recipe = response.meals[0];
          if (!uniquesRecipe.has(recipe.idMeal)) {
            uniquesRecipe.add(recipe.idMeal); 
            this.recipeList.push(recipe);
          }
          if (this.recipeList.length < cant) {
            fetchRecipes(); 
          }
        },
        (error) => {
          console.log(error + ' - Algo salió mal en la función de recetas en home page');
        }
      );
    };

    fetchRecipes(); 
  }
}