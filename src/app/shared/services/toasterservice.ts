import { effect, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../interfaces/toaster.interface';

@Injectable({
  providedIn: 'root',
})
export class Toasterservice {
   private _toasts = signal<Toast[]>([]);
  toasts = this._toasts.asReadonly();

  constructor() {
    effect(() => {
      const toasts = this._toasts();

      // auto-remove logic
      toasts.forEach(toast => {
        if (!('timeout' in toast)) {
          (toast as any).timeout = setTimeout(() => {
            this.remove(toast.id);
          }, toast.duration);
        }
      });
    });
  }

  show(
    message: string,
    type: Toast['type'] = 'info',
    duration: number = 4000
  ) {
    this._toasts.update(list => [
      ...list,
      {
        id: Date.now() + Math.random(),
        message,
        type,
        duration
      }
    ]);
  }

  success(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    this.show(message, 'error', duration);
  }

  warning(message: string, duration?: number) {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration?: number) {
    this.show(message, 'info', duration);
  }

  remove(id: number) {
    this._toasts.update(list =>
      list.filter(t => t.id !== id)
    );
  }
}
