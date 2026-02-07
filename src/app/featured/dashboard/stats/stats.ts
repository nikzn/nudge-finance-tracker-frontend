import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, signal } from '@angular/core';

interface DashboardCard {
  title: string;
  amount: number;
  change: string;
  changeLabel: string;
  isPositive: boolean;
  borderClass: string;
  iconBgClass: string;
  iconColorClass: string;
  iconPath: string;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats {

  statsData = input<any>({});

  // Optional: keep effect only for debugging
  constructor() {
    effect(() => {
      console.log('Stats data updated:', this.statsData());
    });
  }

  cards = computed<DashboardCard[]>(() => {
    const data = this.statsData();

    if (!data) return [];

    return [
      {
        title: 'Total Balance',
        amount: data?.all_time?.net_savings ?? 0,
        change: '+12.5%',
        changeLabel: 'vs last month',
        isPositive: true,
        borderClass: 'border-blue-500',
        iconBgClass: 'bg-blue-50',
        iconColorClass: 'text-blue-600',
        iconPath:
          'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
      },
      {
        title: 'Monthly Income',
        amount: data?.current_month?.income ?? 0,
        change: '+8.2%',
        changeLabel: 'vs last month',
        isPositive: true,
        borderClass: 'border-green-500',
        iconBgClass: 'bg-green-50',
        iconColorClass: 'text-green-600',
        iconPath:
          'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      },
      {
        title: 'Monthly Expenses',
        amount: data?.current_month?.expense ?? 0,
        change: '-3.1%',
        changeLabel: 'vs last month',
        isPositive: false,
        borderClass: 'border-red-500',
        iconBgClass: 'bg-red-50',
        iconColorClass: 'text-red-600',
        iconPath:
          'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6',
      },
      {
        title: 'Transactions',
        amount: data?.current_month?.transaction_count ?? 0,
        change: '',
        changeLabel: '',
        isPositive: true,
        borderClass: 'border-gray-400',
        iconBgClass: 'bg-gray-100',
        iconColorClass: 'text-gray-600',
        iconPath:
          'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2',
      },
    ];
  });
}
