import { Component, input } from '@angular/core';
import { ThemeName, Themeservice } from '../../../shared/services/themeservice';
import { RouterLink } from '@angular/router';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heronavbar',
  imports: [RouterLink, Select, FormsModule, CommonModule],
  templateUrl: './heronavbar.html',
  styleUrl: './heronavbar.css',
})
export class Heronavbar {
  displayAction = input<any>('HeroPage')

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
