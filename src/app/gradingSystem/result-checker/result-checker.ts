import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Exampro} from '../grading-dashboard/exampro/exampro';

@Component({
  selector: 'app-result-checker',
  imports: [
    FormsModule,
    Exampro
  ],
  templateUrl: './result-checker.html',
  styleUrl: './result-checker.scss'
})
export class ResultChecker {
  @ViewChild('targetElement') targetElement!: ElementRef;

  scrollToElement() {
    this.targetElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  searchQuery: string = '';  // Bind to input

  constructor(private router: Router) {}

  onSearch() {
    if (this.searchQuery) {
      // Navigate to the certificate verification page, passing the search query
      this.router.navigate(['/certificate-view'], { queryParams: { name: this.searchQuery } });
    }
  }
}
