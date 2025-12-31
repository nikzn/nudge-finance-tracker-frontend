import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule,FormsModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
  searchQuery: string = '';
  particles: number[] = Array.from({ length: 20 }, (_, i) => i);

  constructor(
    private router: Router,
    private location: Location
  ) {}

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  navigateBack(): void {
    this.location.back();
  }

  handleSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate([this.searchQuery]);
    }
  }

  getParticleStyle(index: number) {
    const random = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    return {
      width: `${random(index * 3) * 4 + 2}px`,
      height: `${random(index * 3) * 4 + 2}px`,
      left: `${random(index * 5) * 100}%`,
      top: `${random(index * 7) * 100}%`,
      animationDelay: `${random(index * 11) * 2}s`,
      animationDuration: `${random(index * 13) * 3 + 2}s`
    };
  }

}
