import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignUpFormData } from '../../../shared/interfaces/user';
import { Auth } from '../../../shared/services/auth';
import { passwordMatchValidator } from '../../../validators/password-validator';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  authService = inject(Auth);
  fb = inject(FormBuilder);
  router = inject(Router);

  ruta = '';

  title = 'Registro de usuario';

  validators = [Validators.required, Validators.minLength(4)];

  signUpForm = this.fb.group(
    {
      username: ['jjzapata', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', this.validators],
      rePassword: ['', this.validators],
    },
    {
      validators: passwordMatchValidator('password', 'rePassword'),
    }
  );

  onSignUp() {
    if (!this.signUpForm.valid) {
      this.showValidationErrors();
      return;
    }

    let user = this.signUpForm.value as SignUpFormData;

    const signUpResponse = this.authService.signUp(user);
    if (signUpResponse.success) {
      this.router.navigate([signUpResponse.redirectTo]);
    } else {
      alert(signUpResponse.message);
    }
  }

  private showValidationErrors() {
    const errors = this.signUpForm.errors;

    if (errors?.['passwordMismatch']) {
      alert('Las contraseñas no coindicen');
      return;
    }

    alert('Faltan campos por diligenciar');
  }
}
