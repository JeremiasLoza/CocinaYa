import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Observable,
  catchError,
  throwError,
  BehaviorSubject,
  tap,
  lastValueFrom,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
//import * as fs from 'file-system';
@Injectable({
  providedIn: 'root',
})
export class AuthLoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({
    id: 0,
    email: '',
    name: '',
    lastName: '',
    password: '',
  });
  private user: User | null | undefined = null;
  constructor(private http: HttpClient) {}
  login(credentials: LoginRequest): Observable<User> {
    return this.http.get<User>('././assets/data.json').pipe(
      tap((userData: User) => {
        this.currentUserData.next(userData);
      }),
      catchError(this.handleError)
    );
  }
  public logout() {
    this.user = undefined;
    localStorage.clear();
    this.currentUserLoginOn.next(false);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occured ' + error.error);
    } else {
      console.log('Backend returned state code ', error.status, error.error);
    }
    return throwError(
      () => new Error('Something went wronge. Please try again')
    );
  }
  get userData(): Observable<User> {
    return this.currentUserData.asObservable();
  }
  get userLoginOn(): Observable<Boolean> {
    return this.currentUserLoginOn.asObservable();
  }
  baseURL = 'http://localhost:3000';
  saveUserData(data: any): Observable<any> {
    // Puedes realizar cualquier procesamiento adicional aquí antes de escribir el JSON
    //console.log(data);
    const url = `${this.baseURL}/user`;
    return this.http.post<boolean>(url, data);
  }
  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }
  public getToAuth(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseURL}/user?email=${email}&password=${password}`
    );
  }
  public async checkAuth(email: string, password: string): Promise<boolean> {
    let isLogin = false;
    try {
      let apiResponse = this.getToAuth(email, password);
      let userRespone = await lastValueFrom(apiResponse);
      this.user = userRespone[0];
      if (this.user) {
        localStorage.setItem('token', this.user.id!.toString());
        isLogin = true;
        this.currentUserLoginOn.next(true);
      }
    } catch (error) {
      throw error;
    }
    return isLogin;
  }
  public searchById(id: string | null): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/user?id=${id}`);
  }
  public hasLoged(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
  public isLoggedIn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }
}
