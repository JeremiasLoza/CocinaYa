import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})




export class UserPageComponent implements OnInit{

 constructor(private userService : UserService ){}

 user !: User ;

 ngOnInit(): void {

  /// aca deberia obtener el id del usuario logeado 
   this.viewUserData(1);
  
 }

 viewUserData(id : number ){
  this.userService.getUserById(id).subscribe((data)=>{
    this.user = {
      id : data.id,
      name : data.name,
      lastName : data.lastName,
      email : data.email,
      password: data.password

    };
    console.log('Usuario cargado:', this.user); // Para verificar el resultado
  }

 )}

}

class User {
  'id' : number;
  'name': string;
  'lastName': string;
  'email':string 
  'password': string; 
}

