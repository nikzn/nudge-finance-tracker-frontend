import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { Toasterservice } from '../../services/toasterservice';
import { Toast } from '../../interfaces/toaster.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-toaster',
  imports: [CommonModule],
  templateUrl: './toaster.html',
  styleUrl: './toaster.css',
})
export class Toaster {
 toastService = inject(Toasterservice);
  toasts = this.toastService.toasts;

  getToastClasses(type: Toast['type']): string {
    const classes = {
      success: 'bg-green-50 border-green-500',
      error: 'bg-red-50 border-red-500',
      warning: 'bg-yellow-50 border-yellow-500',
      info: 'bg-blue-50 border-blue-500'
    };
    return classes[type];
  }

  getIconColor(type: Toast['type']): string {
    const colors = {
      success: 'text-green-500',
      error: 'text-red-500',
      warning: 'text-yellow-500',
      info: 'text-blue-500'
    };
    return colors[type];
  }

  getTextColor(type: Toast['type']): string {
    const colors = {
      success: 'text-green-800',
      error: 'text-red-800',
      warning: 'text-yellow-800',
      info: 'text-blue-800'
    };
    return colors[type];
  }

  closeToast(id: number) {
    this.toastService.remove(id);
  }


  
}

