import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredient } from '../../models/ingredient';
import { Observer } from 'rxjs';
import { RecipeListService } from '../../services/recipe-list.service';


@Component({
  selector: 'app-ingredient-filtering',
  templateUrl: './ingredient-filtering.component.html',
  styleUrl: './ingredient-filtering.component.css'
})
export class IngredientFilteringComponent implements OnInit {
  ingredientList: Ingredient[] = [];
  searchText: string = '';

  constructor(private ingredientService: IngredientService, private recipesListService: RecipeListService) { }



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
    this.recipesListService.setSelectedIngredients([]);
  }

  get visibleIngredients(): Ingredient[] {
    if (this.searchText.trim()){
      return this.ingredientList.filter(ingredient => 
        ingredient.strIngredient.toLowerCase().includes(
          this.searchText.trim().toLowerCase()
        ));
    }
    return this.ingredientList.slice(0,20);
  }

  
get selectedIngredients(): Ingredient[] {
  return this.ingredientList.filter(ingredient => ingredient.selected);
}


  onIngredientChange():void{
    const selectedIngredients = this.ingredientList.filter(ingredient => ingredient.selected).map(ingredient => ingredient.strIngredient);
    this.recipesListService.setSelectedIngredients(selectedIngredients);
    }

    
removeIngredient(ingredient: Ingredient): void {
  ingredient.selected = false;
  this.onIngredientChange();
}





}
