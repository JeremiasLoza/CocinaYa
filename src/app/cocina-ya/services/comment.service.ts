import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Commentary } from '../models/commentary';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http : HttpClient) { }

  private apiUrl = 'http://localhost:3000/commentary';

  getCommentByRecipeId(recipeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?recipeId=${recipeId}`)
  }

  deleteComment(Id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${Id}`);
  }

  addComment(comment: Commentary): Observable<any> {
    return this.http.post<Comment>(`${this.apiUrl}`, comment);
  }
}
