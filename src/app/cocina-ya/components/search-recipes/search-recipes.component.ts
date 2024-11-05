import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-recipes',
  templateUrl: './search-recipes.component.html',
  styleUrls: ['./search-recipes.component.css']
})
export class SearchRecipesComponent {
  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  public searchText: string = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchText = params['name'];
    });
  }


}