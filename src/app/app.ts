import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
import {PasswordModalComponent} from './gradingSystem/password-modal/password-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgIf, PasswordModalComponent, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'gradingsystem';
  constructor(private router: Router) {}
  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
  accessGranted = false;
  onUnlock(success: boolean): void {
    this.accessGranted = success;
  }
  isNavbarCollapsed = false;

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
