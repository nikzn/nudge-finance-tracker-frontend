import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toaster } from './shared/component/toaster/toaster';
import { ThemeName, Themeservice } from './shared/services/themeservice';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Toaster],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  currentTheme: ThemeName;
  availableThemes;

  constructor(private themeService: Themeservice) {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.availableThemes = this.themeService.getAvailableThemes();
  }

  onThemeChange(): void {
    this.themeService.setTheme(this.currentTheme);
    this.currentTheme = this.currentTheme;
  }

}
