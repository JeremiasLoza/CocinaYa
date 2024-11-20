import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http : HttpClient) { }

  private apiUrl = 'http://localhost:3000/commentary';

  getCommentByRecipeId(recipeId : string): Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}?recipeId=${recipeId}`).pipe(
      map((result)=>{
        const commentary = result.find((item) => item.recipeId === recipeId);
        return commentary ? commentary.commentaries : []; 
      })
    )
  }

  
}
