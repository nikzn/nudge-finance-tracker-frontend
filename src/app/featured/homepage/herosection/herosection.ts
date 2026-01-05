import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
interface Feature{
  icon:string,
  title:string,
  description:string,
  color:string
}
@Component({
  selector: 'app-herosection',
  imports: [CommonModule, RouterLink],
  templateUrl: './herosection.html',
  styleUrl: './herosection.css',
})
export class Herosection {
 stats  =signal<any>( [
    { value: '50K+', label: 'Active Users' },
    { value: '$2M+', label: 'Tracked' },
    { value: '30%', label: 'Avg. Savings' },
    { value: '98%', label: 'Satisfaction' }
  ])

  chartHeights = [50, 70, 60, 85, 75, 90, 100];
  cardsVisible: boolean[] = [false, false, false, false];


  features: Feature[] = [
    {
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      title: 'Smart Analytics',
      description: 'Get detailed insights into your spending patterns with beautiful visualizations.',
      color: 'bg-blue-50'
    },
    {
      icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
      title: 'Budget Planning',
      description: 'Set monthly budgets and track your progress with real-time alerts.',
      color: 'bg-blue-50'
    },
    {
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Goal Tracking',
      description: 'Set financial goals and watch your savings grow over time.',
      color: 'bg-blue-50'
    },
    {
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      title: 'Secure & Private',
      description: 'Your data is encrypted and stored securely. We never share your information.',
      color: 'bg-blue-50'
    }
  ];



}
