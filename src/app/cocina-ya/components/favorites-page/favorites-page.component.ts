import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';
import { RecipeListService } from '../../services/recipe-list.service';
import { forkJoin, switchMap } from 'rxjs';
import {  Router } from '@angular/router';
import { useAnimation } from '@angular/animations';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css'
})
export class FavoritesPageComponent implements OnInit {
  recipeList: Recipe[] = [];
  userId = '';
  haveFavorites = true;
  constructor(private favoriteService: FavoritesService, private recipeService: RecipeService, private recipeListService: RecipeListService, private router : Router) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('token')??'';
    this.favoriteService.loadFavorites(this.userId);
    this.getFavorites();
  }

  getFavorites() {
    this.favoriteService.favorites$.pipe(
      switchMap((favoritesIds: string[]) => {
        if (favoritesIds.length === 0) {
          // Si no hay favoritos, vacía la lista de recetas
          this.recipeList = [];
          this.haveFavorites = false;
          return [];
        }

        // Obtener detalles de cada receta favorita
        const recipeRequests = favoritesIds.map(id => this.recipeService.getById(id));
        return forkJoin(recipeRequests);
      })
    ).subscribe((recipes: Recipe[]) => {
      // Solo actualiza si hay un cambio
      if (this.recipeList !== recipes) {
        this.recipeList = recipes;
        if(this.router.url === '/favorites')
          this.recipeListService.setRecipes(this.recipeList);
      }
    });
  }
 
}


