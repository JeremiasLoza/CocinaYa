import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLoginService } from '../../../cocina-ya/services/auth.login.service';
import { FavoritesService } from '../../../cocina-ya/services/favorites.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  
  strongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  userForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private loginService: AuthLoginService, 
    private router: Router,
    private favoritesService : FavoritesService,
    private toastr : ToastrService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.strongPasswordRegx)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.confirmPasswordValidator });
  }

  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  get email() {
    return this.userForm.controls['email'];
  }

  get password() {
    return this.userForm.controls['password'];
  }

  get confirmPassword() {
    return this.userForm.controls['confirmPassword'];
  }

  get name() {
    return this.userForm.controls['name'];
  }

  get lastName() {
    return this.userForm.controls['lastName'];
  }

  validateForm() {

    if (this.userForm.valid) {

      let user = {
        name : this.userForm.get('name')?.value,
        lastName : this.userForm.get('lastName')?.value,
        email: this.userForm.get('email')?.value,
        password : this.userForm.get('password')?.value
      }
      this.loginService.saveUserData(user).subscribe(
        response => {
          this.toastr.success('User registered succesfully','Register')
          this.favoritesService.addUser(response.id).subscribe();
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error when sending data:', error);
        }
      );
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}