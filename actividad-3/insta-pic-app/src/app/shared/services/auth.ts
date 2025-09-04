import { Injectable } from '@angular/core';
import type { LoginFormData, SignUpFormData } from '../interfaces/user';
import type { LoginResponse, SignUpResponse } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  login({ username, password }: LoginFormData): LoginResponse {
    const credentialsString = localStorage.getItem(username);

    if (!credentialsString) {
      return { success: false };
    }

    if (credentialsString) {
      const credentials = JSON.parse(credentialsString);

      const isValidPassword = password !== credentials.password;
      if (isValidPassword) {
        return { success: false };
      }
      return { success: true, redirectTo: 'home' };
    }
    return { success: false };
  }

  signUp(user: SignUpFormData): SignUpResponse {
    if (localStorage.getItem(user.username!)) {
      return { success: false, message: 'El usuario ya existe' };
    }

    localStorage.setItem(user.username!, JSON.stringify(user));
    return { success: true, redirectTo: 'home' };
  }
}
