import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/';
  constructor(private http : HttpClient) { }

  getAllIngredients() : Observable<any> {
    return this.http.get(`${this.apiUrl}list.php?i=list`);
  }
}
