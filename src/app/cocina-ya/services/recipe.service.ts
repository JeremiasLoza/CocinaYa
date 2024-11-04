import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public recipeList: Recipe[] = [];
  public recipe: Recipe[] = [];
  
  constructor(private http : HttpClient) { }
 
  private apiURL = "https://www.themealdb.com/api/json/v1/1/";

  get1Ramdom(): Observable <any> {
    return this.http.get<any>(this.apiURL+"random.php");
  }

  getById(id : string) : Observable<Recipe> {
    return this.http.get<{ meals: Recipe[] }>(`${this.apiURL}lookup.php?i=${id}`).pipe(
      map(response => response.meals[0]) )
  }
}
