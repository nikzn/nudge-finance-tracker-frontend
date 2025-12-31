import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css',
})
export class PageNotFound {
  invalidRoute = signal('');

  constructor(private router: Router) {
    this.invalidRoute.set(this.router.url);
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  refreshPage(): void {
    window.location.reload();
  }
}
