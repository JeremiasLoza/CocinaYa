import { Component } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styles: ``
})
export class RecipePageComponent {
  constructor(private RecipeService: RecipeService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      let recipeId = params.get('id');
      if (recipeId && !isNaN(Number(recipeId))) {
        this.RecipeService.getById(recipeId);
      } else {
        this.router.navigateByUrl('/not-found');
      }
    });
  }

}
