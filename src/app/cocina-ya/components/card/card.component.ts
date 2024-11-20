import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { FavoritesService } from '../../services/favorites.service';
import { ToastrService } from 'ngx-toastr';
import { AuthLoginService } from '../../services/auth.login.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent implements OnInit {
  isLogged = false;
  userId: string = '';
  isHeartActive !: boolean;
  @Input()
  recipe!: Recipe;

  constructor(private favoriteService: FavoritesService, private authService: AuthLoginService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(response => {
      this.isLogged = response;
      if (this.isLogged) {

        this.userId = localStorage.getItem('token')??'';
        this.favoriteService.loadFavorites(this.userId);
        this.favoriteService.favorites$.subscribe((favoriteIds) => {
          this.isHeartActive = favoriteIds.includes(this.recipe.idMeal);
        })

      }
    })

  }

  onHeartClick(userId: string, recipeId: string): void {
    event?.stopPropagation();
    this.isHeartActive = !this.isHeartActive;

    if (this.isHeartActive) {
      this.favoriteService.addFavorite(userId, recipeId).subscribe(() => {
        this.toastr.success('Recipe added succesfuly', 'Favorites');
      }

      );
    } else {
      this.favoriteService.removeFavorite(userId, recipeId).subscribe(() => {
        this.toastr.info('Recipe deleted succesfuly', 'Favorites');
      });
    }
  }


}
