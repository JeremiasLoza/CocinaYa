import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { FavoritesService } from '../../services/favorites.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent implements OnInit{
  isLogged = true;
  
  isHeartActive !: boolean;
  @Input()
   recipe!: Recipe;

   constructor(private favoriteService : FavoritesService){}

  ngOnInit(): void {
    this.favoriteService.loadFavorites('1');
    this.favoriteService.favorites$.subscribe((favoriteIds)=>{
      this.isHeartActive = favoriteIds.includes(this.recipe.idMeal);
    })
  }

  onHeartClick(userId : string , recipeId : string): void{
    event?.stopPropagation();
    this.isHeartActive = !this.isHeartActive;

    if(this.isHeartActive){
      this.favoriteService.addFavorite(userId,recipeId).subscribe();
    }else{
      this.favoriteService.removeFavorite(userId,recipeId).subscribe();
    }
  }


}
