import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
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
export class Sidemenu implements OnInit {
  featuredPage=signal('Featured')
isExpanded = true;
  activeItem = 'Dashboard';

  authService = inject(Authenticationservice)
  router = inject(Router)
  
ngOnInit() {
  const urlTree = this.router.parseUrl(this.router.url);
  const segments = urlTree.root.children['primary']?.segments;
  const lastSegment = segments?.[segments.length - 1]?.path;
  console.log(lastSegment)
  this.activeItem = lastSegment.toLowerCase();
}
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
      link:'/budget'
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
    this.activeItem = item.label.toLowerCase();
     this.router.navigateByUrl(item.link);
  }
}
