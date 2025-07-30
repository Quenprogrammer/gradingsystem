import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-grading-dashboard',
  imports: [],
  templateUrl: './grading-dashboard.component.html',
  styleUrl: './grading-dashboard.component.css'
})
export class GradingDashboardComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
  statisticsDashboard=[
    {name:'Students', value:3, details:'Registered students'},
    {name:'Courses', value:3, details:'Added courses'},
    {name:'Result', value:3 ,details:'Validated students results'},
  ]
}
