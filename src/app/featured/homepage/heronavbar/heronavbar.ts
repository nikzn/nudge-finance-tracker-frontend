import { Component } from '@angular/core';
import { ThemeName, Themeservice } from '../../../shared/services/themeservice';
import { RouterLink } from '@angular/router';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-heronavbar',
  imports: [RouterLink,Select,FormsModule],
  templateUrl: './heronavbar.html',
  styleUrl: './heronavbar.css',
})
export class Heronavbar {
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
