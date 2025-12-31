import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeName = 
  | 'blue' 
  | 'purple' 
  | 'green' 
  | 'orange' 
  | 'midnight' 
  | 'emerald' 
  | 'royal' 
  | 'slate' 
  | 'rose-gold' 
  | 'teal' 
  | 'crimson' 
  | 'gold'
  | 'white'
  | 'white-minimal'
  | 'white-warm';

@Injectable({
  providedIn: 'root',
})
export class Themeservice {
  
  private readonly THEME_KEY = 'app-theme';
  private currentTheme$ = new BehaviorSubject<ThemeName>('blue');

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as ThemeName;
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('blue');
    }
  }

  setTheme(theme: ThemeName): void {
    const body = document.body;
    body.removeAttribute('data-theme');
    body.classList.remove('blue-theme');
    
    if (theme === 'blue') {
      body.classList.add('blue-theme');
    } else {
      body.setAttribute('data-theme', theme);
    }
    
    localStorage.setItem(this.THEME_KEY, theme);
    this.currentTheme$.next(theme);
  }

  getCurrentTheme$() {
    return this.currentTheme$.asObservable();
  }

  getCurrentTheme(): ThemeName {
    return this.currentTheme$.value;
  }

  getAvailableThemes(): { value: ThemeName; label: string }[] {
    return [
      { value: 'blue', label: 'Blue' },
      { value: 'purple', label: 'Purple' },
      { value: 'green', label: 'Green' },
      { value: 'orange', label: 'Orange' },
      { value: 'midnight', label: 'Midnight Blue' },
      { value: 'emerald', label: 'Emerald' },
      { value: 'royal', label: 'Royal Purple' },
      { value: 'slate', label: 'Slate' },
      { value: 'rose-gold', label: 'Rose Gold' },
      { value: 'teal', label: 'Teal' },
      { value: 'crimson', label: 'Crimson' },
      { value: 'gold', label: 'Gold' },
      { value: 'white', label: 'White Luxe' },
      { value: 'white-minimal', label: 'White Minimal' },
      { value: 'white-warm', label: 'White Warm' }
    ];
  }




}
