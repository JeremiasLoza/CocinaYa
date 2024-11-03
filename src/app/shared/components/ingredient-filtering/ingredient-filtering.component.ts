import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../../cocina-ya/services/ingredient.service';
import { Ingredient } from '../../../cocina-ya/models/ingredient';
import { Observer } from 'rxjs';


@Component({
  selector: 'app-ingredient-filtering',
  templateUrl: './ingredient-filtering.component.html',
  styleUrl: './ingredient-filtering.component.css'
})
export class IngredientFilteringComponent implements OnInit {
  ingredientList: Ingredient[] = [];
  searchTerm: string = '';

  constructor(private ingredientService: IngredientService) { }


  ngOnInit(): void {
    const observer: Observer<any> = {
      next: (data) => {
        this.ingredientList = data.meals.map((ingredient: any) => (
          {
            ...ingredient,
            selected: false,
          }
        ));

      },
      error: (error) => {
        console.log(error);
      },
      complete: () => { console.log('Ingredient List request completed'); }
    }

    this.ingredientService.getAllIngredients().subscribe(observer);
  }

}
