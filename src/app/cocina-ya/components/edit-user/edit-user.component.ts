import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup,ValidationErrors,Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { UserService } from '../../services/user.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{

  userForm: FormGroup;

  strongPasswordRegx: RegExp =/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  
  constructor(private formBuilder: FormBuilder, private auth : AuthServiceService, private userservice : UserService, private router : Router) {
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
    this.auth.login(2);
   /* 
    // Obtener el parámetro 'id' de la ruta
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Editar usuario con ID:', this.userId);
    // Aquí puedes cargar los datos del usuario para edición
   */

    const loggedInUserId = +localStorage.getItem('loggedInUserId')!;
    
    if(loggedInUserId){
      this.userservice.getUserById(loggedInUserId).subscribe((user)=>{
        this.userForm.patchValue({
          id : user.id,
          name : user.name,
          lastName : user.lastName,
          email: user.email,
          password : user.password,
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
      
       this.userservice.editUser(this.userForm.value).subscribe(
        response => {
          console.log('Server response:', response);
          this.router.navigate(['/login']);
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
