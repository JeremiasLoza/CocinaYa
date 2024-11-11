import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  private apiURL = "https://www.themealdb.com/api/json/v1/1/";

  get1Ramdom(): Observable<any> {
    return this.http.get<any>(this.apiURL + "random.php");
  }

  getById(id: string): Observable<Recipe> {
    return this.http.get<{ meals: Recipe[] }>(`${this.apiURL}lookup.php?i=${id}`).pipe(
      map(response => response.meals[0]));
  }

  getByFirstLetter(letter: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}search.php?f=${letter}`);
  }

  getAllRecipes(): Observable<Recipe[]> {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    return forkJoin(
      alphabet.map(letter => this.getByFirstLetter(letter))
    ).pipe(
      // Combina todas las respuestas en un solo array de recetas
      map((responses: any[]) => {
        return responses
          .flatMap(response => response.meals || [])  // Asegura que no haya errores con letras sin recetas
          .map(meal => ({ ...meal }) as Recipe); // Mapea cada objeto al tipo Recipe
      })
    );
  }
}
