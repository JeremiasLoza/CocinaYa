import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipeListService } from '../../services/recipe-list.service';

@Component({
  selector: 'app-recipe-detail-modal',
  templateUrl: './recipe-detail-modal.component.html',
  styleUrls: ['./recipe-detail-modal.component.css']
})
export class RecipeDetailModalComponent implements OnInit{
  
  constructor(public recipeListService : RecipeListService){}
  @Input() recipe!: Recipe; 
  @Input() index!: number | null; 
  @Input() recipes!: Recipe[]; 
  @Output() close = new EventEmitter<void>(); 
  recipeIngredients: string[] = []
  
  ngOnInit(): void {
      this.recipeIngredients = this.recipeListService.getRecipeIngredients(this.recipe);
  }

  getMeasure(recipe: Recipe, index: number): string {
    const measureKey = `strMeasure${index}`;
    return recipe[measureKey as keyof Recipe] || ''; 
  }

  closeModal(): void {
    this.close.emit(); 
  }
}
