import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../shared/services/auth';
import { LoginFormData } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  authService = inject(Auth);

  LogInForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(2)]],
  });

  onLogin() {
    const user = this.LogInForm.value as LoginFormData;

    if (!this.LogInForm.valid || !user.username || !user.password) {
      alert('Faltan campos por diligenciar mi papacho');
      return;
    }

    const loginResponse = this.authService.login(user);

    if (loginResponse.success) {
      this.router.navigate([loginResponse.redirectTo]);
    } else {
      alert('Credenciales incorrectas mi papacho');
    }
  }
}
