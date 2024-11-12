import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipeListService } from '../../services/recipe-list.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-recipe-detail-modal',
  templateUrl: './recipe-detail-modal.component.html',
  styleUrls: ['./recipe-detail-modal.component.css']
})
export class RecipeDetailModalComponent implements OnInit{
  
  constructor(public recipeListService : RecipeListService, private favoriteService : FavoritesService){}
  @Input() recipe!: Recipe; 
  @Input() index!: number; 
  @Input() recipes!: Recipe[]; 
  @Output() close = new EventEmitter<void>(); 
  isHeartActive !: boolean;
  recipeIngredients: string[] = [];
  isLogged = true;

  ngOnInit(): void {
    this.recipeIngredients = this.recipeListService.getRecipeIngredients(this.recipe);
    this.justifyInstructions(this.recipe.strInstructions);

    this.favoriteService.favorites$.subscribe((favoriteIds)=>{
      this.isHeartActive = favoriteIds.includes(this.recipe.idMeal);
    })
    
  }

  @HostListener('document:keydown.escape', ['$event']) // Cierra con "Esc"
  onEscKeydown(event: KeyboardEvent) {
    this.closeModal();
  }

  onHeartClick(userId : string , recipeId : string): void{
    this.isHeartActive = !this.isHeartActive;

    if(this.isHeartActive){
      this.favoriteService.addFavorite(userId,recipeId).subscribe();
    }else{
      this.favoriteService.removeFavorite(userId,recipeId).subscribe();
    }
  }

  onIngredientClick(ingredientName : string):void{
    this.closeModal();
  }

  getMeasure(recipe: Recipe, index: number): string {
    const measureKey = `strMeasure${index}`;
    return recipe[measureKey as keyof Recipe] || ''; 
  }

  closeModal(): void {
    this.close.emit(); 
  }

  nextRecipe(): void {
    if (this.index < this.recipes.length - 1) {
      this.recipe = this.recipes[this.index + 1];
      this.recipeIngredients = this.recipeListService.getRecipeIngredients(this.recipe);
      this.justifyInstructions(this.recipe.strInstructions);
      this.favoriteService.favorites$.subscribe((favoriteIds)=>{
        this.isHeartActive = favoriteIds.includes(this.recipe.idMeal);
      })
      this.index++;
    }
  }

  previousRecipe(): void {
    if (this.index > 0) {
      this.recipe = this.recipes[this.index - 1];
      this.recipeIngredients = this.recipeListService.getRecipeIngredients(this.recipe);
      this.justifyInstructions(this.recipe.strInstructions);
      this.favoriteService.favorites$.subscribe((favoriteIds)=>{
        this.isHeartActive = favoriteIds.includes(this.recipe.idMeal);
      })
      this.index--;
    }
  }

  justifyInstructions(instructions:string):void{
    const instructionsElement = document.querySelector(".instructions p");
    if(instructionsElement){
      instructionsElement.innerHTML = instructions.replace(/\.\s/g, ".<br>");
    }
  }

  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) { // Verifica si el clic fue en el fondo oscuro
      this.closeModal();
    }
  }
}
