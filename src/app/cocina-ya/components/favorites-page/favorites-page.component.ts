import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';
import { RecipeListService } from '../../services/recipe-list.service';
import { forkJoin, switchMap } from 'rxjs';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css'
})
export class FavoritesPageComponent implements OnInit {
  recipeList: Recipe[] = [];
  constructor(private favoriteService: FavoritesService, private recipeService: RecipeService, private recipeListService: RecipeListService, private router : Router) { }

  ngOnInit(): void {
    const userId = '1';  // Hardcodeado para el usuario actual, ajustar si es necesario
    this.favoriteService.loadFavorites(userId);
    this.getFavorites();
  }

  getFavorites() {
    this.favoriteService.favorites$.pipe(
      switchMap((favoritesIds: string[]) => {
        if (favoritesIds.length === 0) {
          // Si no hay favoritos, vacía la lista de recetas
          this.recipeList = [];
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

