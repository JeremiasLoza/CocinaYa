import { Component, OnInit } from '@angular/core';
import { AuthLoginService } from './cocina-ya/services/auth.login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'cocinaya';
  constructor(private authService: AuthLoginService) {}

  ngOnInit() {
    const isLoggedIn = this.authService.hasLoged();

    this.authService.currentUserLoginOn.next(isLoggedIn);
  }  
}
