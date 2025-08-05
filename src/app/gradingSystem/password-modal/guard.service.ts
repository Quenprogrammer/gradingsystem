import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  private isAuthenticated = false;
  private readonly correctPassword = '2722'; // Replace with env/config

  checkPassword(password: string): boolean {
    const isValid = password === this.correctPassword;
    this.isAuthenticated = isValid;
    return isValid;
  }

  hasAccess(): boolean {
    return this.isAuthenticated;
  }
}
