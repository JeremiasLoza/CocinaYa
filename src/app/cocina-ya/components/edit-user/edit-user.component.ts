import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup,ValidationErrors,Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthLoginService } from '../../services/auth.login.service';
import { User } from '../../models/user';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{

  userForm: FormGroup;

  strongPasswordRegx: RegExp =/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  
  constructor(private formBuilder: FormBuilder, private userservice : AuthLoginService, private router : Router, private toastr : ToastrService) {
    // Ahora `userForm` se inicializa después de que `formBuilder` esté listo
    this.userForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.strongPasswordRegx)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.confirmPasswordValidator });
  }

  ngOnInit(): void {
    //this.auth.login(2);
   /* 
    // Obtener el parámetro 'id' de la ruta
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Editar usuario con ID:', this.userId);
    // Aquí puedes cargar los datos del usuario para edición
   */

    const token = localStorage.getItem('token') ?? '';

    
    if(token){
      this.userservice.searchById(token).subscribe((user)=>{
        this.userForm.patchValue({
          id : user[0].id,
          name : user[0].name,
          lastName : user[0].lastName,
          email: user[0].email,
          password : user[0].password,
          confirmPassword : ''
        })
      })
    }
  }

  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };}
    else{
    return null;}
  }

  get email(){
    return this.userForm.controls['email'];
  }

  get password(){
    return this.userForm.controls['password'];
  }

  get confirmPassword(){
    return this.userForm.controls['confirmPassword'];
  }

  get name(){
    return this.userForm.controls['name'];
  }

  get lastName(){
    return this.userForm.controls['lastName'];
  }

  validateForm(){
    if(this.userForm.valid){
      let user = {
        name : this.userForm.get('name')?.value,
        lastName : this.userForm.get('lastName')?.value,
        email: this.userForm.get('email')?.value,
        password : this.userForm.get('password')?.value,
        id: localStorage.getItem('token') ?? ''
      }
       this.userservice.editUser(user).subscribe(
        response => {
          console.log('Server response:', response);
          this.toastr.success('User modified succesfully','Edit');
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Error when sending data:', error);
        } 
      );
  }else{
      this.userForm.markAllAsTouched();
    }
  }


}

