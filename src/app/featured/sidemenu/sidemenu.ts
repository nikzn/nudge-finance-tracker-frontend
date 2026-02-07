import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Authenticationservice } from '../../shared/services/authenticationservice';
import { Avatar } from '../../shared/component/avatar/avatar';

interface MenuItem {
  icon: string;
  label: string;
  link:string;
}
@Component({
  selector: 'app-sidemenu',
  imports: [CommonModule, RouterOutlet, Avatar],
  templateUrl: './sidemenu.html',
  styleUrl: './sidemenu.css',
})
export class Sidemenu {
  featuredPage=signal('Featured')
isExpanded = true;
  activeItem = 'Dashboard';

  authService = inject(Authenticationservice)
  router = inject(Router)
  

  menuItems: MenuItem[] = [
    {
      icon: 'pi pi-objects-column',
      label: 'Dashboard',
      link:'/dashboard'
      
    },
    {
      icon: 'pi pi-arrow-right-arrow-left',
      label: 'Transactions',
      link:'/transactions'
    },
        {
      icon: 'pi pi-bars',
      label: 'Categories',
      link:'/categories'
    },
    {
      icon: 'pi pi-shopping-bag',
      label: 'Budget',
      link:'/budgets'
    },
    {
      icon: 'pi pi-cog',
      label: 'Settings',
      link:'/settings'
    }
  ];

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
  }

  setActiveItem(item: MenuItem): void {
    console.log(item);
    
    this.activeItem = item.label;
     this.router.navigateByUrl(item.link);
  }
}
