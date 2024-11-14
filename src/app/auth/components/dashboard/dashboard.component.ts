import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../cocina-ya/models/user';
import { AuthLoginService } from '../../../cocina-ya/services/auth.login.service';

@Component({
  selector: 'auth-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public user!: User;

  constructor(private loginService: AuthLoginService, private router: Router) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    const value = localStorage.getItem('token');

    this.loginService.searchById(value).subscribe(
      (user: User[]) => {
        this.user = user[0];
      },
      (error: any) => {
        console.error('Error when searching for users by ID:', error);
      }
    );
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/home']);
  }
}