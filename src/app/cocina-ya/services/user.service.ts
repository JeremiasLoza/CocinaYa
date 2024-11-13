import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  apiUrl = "http://localhost:3000/users"

  getUserById(id : number):Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  editUser(user : any): Observable<any>{
    console.log(user);
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    })
    return this.http.put(`${this.apiUrl}/${user.id}`, user, {headers})
  }

  
}
