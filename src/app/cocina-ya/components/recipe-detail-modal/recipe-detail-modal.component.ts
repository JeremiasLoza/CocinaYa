import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipeListService } from '../../services/recipe-list.service';
import { FavoritesService } from '../../services/favorites.service';
import { ToastrService } from 'ngx-toastr';
import { AuthLoginService } from '../../services/auth.login.service';
import { CommentService } from '../../services/comment.service';
import { Commentary } from '../../models/commentary';

@Component({
  selector: 'app-recipe-detail-modal',
  templateUrl: './recipe-detail-modal.component.html',
  styleUrls: ['./recipe-detail-modal.component.css']
})
export class RecipeDetailModalComponent implements OnInit {

  
  @Input() recipe!: Recipe;
  @Input() index!: number;
  @Input() recipes!: Recipe[];
  @Output() close = new EventEmitter<void>();
  


  isHeartActive !: boolean;
  recipeIngredients: string[] = [];
  isLogged = false;
  userId : string = '';
  comments: any [] = []
  comentaryId : string = '';

  constructor(
    public recipeListService: RecipeListService,
    private favoriteService: FavoritesService,
    private authService: AuthLoginService,
    private toastr: ToastrService,
    private commentService : CommentService) { }

  ngOnInit(): void {
    this.recipeIngredients = this.recipeListService.getRecipeIngredients(this.recipe);
    this.justifyInstructions(this.recipe.strInstructions);
    
    this.authService.isLoggedIn().subscribe(response => {
      this.isLogged = response;
      if (this.isLogged) {
        this.userId = localStorage.getItem('token')??''
        this.favoriteService.favorites$.subscribe((favoriteIds) => {
          this.isHeartActive = favoriteIds.includes(this.recipe.idMeal);
        })
      }

    })


  }
    this.getComments(this.recipe.idMeal);
  }


  getComments(recipeId : string){
    this.commentService.getCommentByRecipeId(recipeId).subscribe(data=>{
      this.comments = data.reverse();
    })
  }

  handleCommentAdded(newComment: { text: string, userId: string }): void {
    const commentToAdd: Commentary = {
      id: Math.random().toString(36).substr(2, 9),
      recipeId: this.recipe.idMeal,
      text: newComment.text,
      userId: newComment.userId,
      date: new Date().toISOString()  // Fecha actual
    };
  
    this.commentService.addComment(commentToAdd).subscribe(() => {
      this.comments.unshift(commentToAdd);
    });
  }

  handleCommentDeleted(commentId: string) {
    this.comments = this.comments.filter(comment => comment.id !== commentId);
  }


  @HostListener('document:keydown.escape', ['$event']) // Cierra con "Esc"
  onEscKeydown(event: KeyboardEvent) {
    this.closeModal();
  }

  onHeartClick(userId: string, recipeId: string): void {
    this.isHeartActive = !this.isHeartActive;

    if (this.isHeartActive) {
      this.favoriteService.addFavorite(userId, recipeId).subscribe(() => {
        this.toastr.success('Recipe added succesfuly', 'Favorites');
      });
    } else {
      this.favoriteService.removeFavorite(userId, recipeId).subscribe(() => {
        this.toastr.info('Recipe deleted succesfuly', 'Favorites');
      });
    }
  }

  onIngredientClick(ingredientName: string): void {
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
      this.getComments(this.recipe.idMeal);
      this.favoriteService.favorites$.subscribe((favoriteIds) => {
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
      this.getComments(this.recipe.idMeal);
      this.favoriteService.favorites$.subscribe((favoriteIds) => {
        this.isHeartActive = favoriteIds.includes(this.recipe.idMeal);
      })
      this.index--;
    }
  }

  justifyInstructions(instructions: string): void {
    const instructionsElement = document.querySelector(".instructions p");
    if (instructionsElement) {
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
