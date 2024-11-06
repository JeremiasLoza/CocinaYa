import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeListService } from '../../services/recipe-list.service';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-search-recipes',
  templateUrl: './search-recipes.component.html',
  styleUrls: ['./search-recipes.component.css']
})
export class SearchRecipesComponent {
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private recipeListService : RecipeListService) { }

  public searchText: string = '';
  recipeList : Recipe[] = []

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchText = params['name'];
      this.searchRecipes();
    });
  }


  searchRecipes() {
    this.recipeService.getAllRecipes().subscribe(recipes => {
      // Filtra las recetas que incluyen el `searchText` en el nombre
        this.recipeList = recipes.filter((recipe: Recipe) => 
        recipe.strMeal.toLowerCase().includes(this.searchText.toLowerCase())
      );
      // Pasa la lista filtrada al servicio `recipeListService` para que se muestre en el list-recipes component
      this.recipeListService.setRecipes(this.recipeList);
    });
  }

}