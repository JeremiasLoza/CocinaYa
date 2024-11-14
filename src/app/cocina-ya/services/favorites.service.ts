import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { BehaviorSubject, map, mergeMap, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favoritesSubject = new BehaviorSubject<string[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  apiUrl = 'http://localhost:3000/favorites';

  constructor(private http: HttpClient) { }

  loadFavorites(userId: string): void {
    this.getFavorites(userId).subscribe((favorites) => {
      const newFavorites = favorites.recipeIds;
      const currentFavorites = this.favoritesSubject.getValue();
      if (JSON.stringify(newFavorites) !== JSON.stringify(currentFavorites)) {
        this.favoritesSubject.next(favorites.recipeIds); // Emite los favoritos actuales
      }
    });
  }

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
          return this.http.put(`${this.apiUrl}/${favorite.id}`, favorite).pipe(
            tap(() => this.loadFavorites(userId))
          );
        } else { // Si no existe, crearlo
          const newFavorite = {
            userId: userId,
            recipeIds: [recipeId]
          };
          return this.http.post(this.apiUrl, newFavorite).pipe(
            tap(() => this.loadFavorites(userId))
          );
        }
      })
    );
  }

  removeFavorite(userId: string, recipeId: string): Observable<any> {
    return this.getFavorites(userId).pipe(
      switchMap(favorites => {
        if (!favorites) {
          return of(null);
        }
        const updatedRecipeIds = favorites.recipeIds.filter((id: string) => id !== recipeId);

        return this.http.patch(`${this.apiUrl}/${favorites.id}`, { recipeIds: updatedRecipeIds }).pipe(
          tap(() => this.loadFavorites(userId))
        )
      })
    )
  }
}
