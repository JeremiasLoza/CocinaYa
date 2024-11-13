import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  login(userId: number): void {
    localStorage.setItem('loggedInUserId', userId.toString());
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('loggedInUserId');
  }

  // Método para obtener el ID del usuario logueado
  getLoggedInUserId(): number | null {
    const userId = localStorage.getItem('loggedInUserId');
    return userId ? +userId : null;
  }
}
