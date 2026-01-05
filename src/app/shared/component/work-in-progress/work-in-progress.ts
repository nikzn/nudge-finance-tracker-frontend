import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-in-progress',
  templateUrl: './work-in-progress.html',
  styleUrl: './work-in-progress.css',
})
export class WorkInProgress {
  progress = 0;
  private intervalId: any;

  constructor(
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        if (this.progress < 73) {
          this.progress += 1;
        } else {
          clearInterval(this.intervalId);
        }
      }, 30);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
