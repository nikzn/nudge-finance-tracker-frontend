import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-in-progress',
  imports: [],
  templateUrl: './work-in-progress.html',
  styleUrl: './work-in-progress.css',
})
export class WorkInProgress {
  progress: number = 0;
  private intervalId: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Simulate progress animation
    this.intervalId = setInterval(() => {
      if (this.progress < 73) {
        this.progress += 1;
      } else {
        clearInterval(this.intervalId);
      }
    }, 30);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
