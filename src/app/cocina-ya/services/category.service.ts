import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/';

  constructor(private http: HttpClient) { }

  getAllCategories() : Observable<any> {
    return this.http.get<any>(`${this.apiUrl}categories.php`);
  }

  getRecipeByCategory(category : string | null) : Observable<any> {
    return this.http.get<any>(`${this.apiUrl}filter.php?c=${category}`);
  }

}
