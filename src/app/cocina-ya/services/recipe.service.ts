import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public recipeList: Recipe[] = [];
  public recipe: Recipe[] = [];
  
  constructor(private http : HttpClient) { }
 
  private apiURL = "https://www.themealdb.com/api/json/v1/1/";

  getbyFirstLetter():Observable <any>{
    return this.http.get<any>(this.apiURL + "search.php?f=c ");
  }

  get1Ramdom(): Observable <any> {
    return this.http.get<any>(this.apiURL+"random.php");
  }

  getByName(strMeal: string): Promise<any>{
    return this.http.get(this.apiURL + '/GetByName/' + strMeal)
      .toPromise();
  }

  searchRecipeById(recipeId: string): Promise<any>{
    return this.http.get(this.apiURL + '/' + recipeId)
      .toPromise();
  }
  
}
