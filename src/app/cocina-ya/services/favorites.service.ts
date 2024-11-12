import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { map, mergeMap, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  apiUrl = 'http://localhost:3000/favorites';

  constructor(private http : HttpClient) { }

  getFavorites(userId: string): Observable<any | null> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`).pipe(
      map((favorites: any[]) => favorites[0] || null)
    );
  }
  

  addFavorite(userId: string, recipeId: string): Observable<any> {
    return this.getFavorites(userId).pipe(
      switchMap((favorite: any) => {
        if (favorite) { // Si existe, agregar el recipeId
          favorite.recipeIds.push(recipeId);
          return this.http.put(`${this.apiUrl}/${favorite.id}`, favorite);
        } else { // Si no existe, crearlo
          const newFavorite = {
            userId: userId,
            recipeIds: [recipeId]
          };
          return this.http.post(this.apiUrl, newFavorite);
        }
      })
    );
  }

}
