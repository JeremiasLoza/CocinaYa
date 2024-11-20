import { Component, OnInit } from '@angular/core';
import { AuthLoginService } from '../../services/auth.login.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})


export class UserPageComponent implements OnInit{

 constructor(private auth : AuthLoginService){}

 user !: User ;
 userId: number | null = null;


 ngOnInit(): void {

  /// aca deberia obtener el id del usuario logeado 
  const token = localStorage.getItem('token') ?? ''; // Obtén el ID de usuario almacenado como token
  
  console.log('ID de usuario desde localStorage:', token);

  this.viewUserData(token);
  
 }

 viewUserData(id : string ){
  this.auth.searchById(id).subscribe((data)=>{
    this.user = {
      id : data[0].id,
      name : data[0].name,
      lastName : data[0].lastName,
      email : data[0].email,
      password: data[0].password

    };
    console.log('Usuario cargado:', this.user); // Para verificar el resultado
  }

 )}

}

