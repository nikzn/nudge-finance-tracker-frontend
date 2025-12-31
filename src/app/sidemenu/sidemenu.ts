import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Authenticationservice } from '../shared/services/authenticationservice';
import { Avatar } from '../shared/component/avatar/avatar';
interface MenuItem {
  icon: string;
  label: string;
}
@Component({
  selector: 'app-sidemenu',
  imports: [CommonModule,RouterOutlet,Avatar],
  templateUrl: './sidemenu.html',
  styleUrl: './sidemenu.css',
})
export class Sidemenu {
isExpanded = true;
  activeItem = 'Dashboard';

  authService = inject(Authenticationservice)

  

  menuItems: MenuItem[] = [
    {
      icon: 'pi pi-objects-column',
      label: 'Dashboard'
    },
    {
      icon: 'pi pi-arrow-right-arrow-left',
      label: 'Transactions'
    },
    {
      icon: 'pi pi-shopping-bag',
      label: 'Budget'
    },
    {
      icon: 'pi pi-chart-pie',
      label: 'Reports'
    },
    {
      icon: 'pi pi-cog',
      label: 'Settings'
    }
  ];

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
  }

  setActiveItem(label: string): void {
    this.activeItem = label;
  }
}
