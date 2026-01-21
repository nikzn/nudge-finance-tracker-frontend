import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard-service';
import { Navbar } from "../sidemenu/navbar/navbar";
import { NavbarConfig } from '../../shared/interfaces/navbar.interface';
import { Stats } from './stats/stats';
import { LineChart } from "../../shared/component/line-chart/line-chart";
import { CommonModule } from '@angular/common';
import { Categories } from "../categories/categories";
import { DonutChart } from "../../shared/component/donut-chart/donut-chart";

interface Transaction {
  icon: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
}

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

interface SpendingCategory {
  name: string;
  value: number;
  color: string;
  percentage?: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, Stats, LineChart, CommonModule, DonutChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
  
  constructor(private dashboardService:DashboardService){}
  
  config: NavbarConfig = {
      title: 'Dashboard',
      subtitle: `Welcome back! Here's your financial overview.`,
      actions: [{
        type: 'primary',
        icon: 'pi pi-plus',
        label: 'Add Budget',
       
  
      }]
    }

     incomeExpensesData: MonthlyData[] = [];


  ngOnInit(): void {
      this.generateChartPaths();
    this.generatePieChart();
    this.dashboardService.getDashboardData().subscribe(res=>{
      this.incomeExpensesData = res[4]
    })
   

  }



  spendingData: SpendingCategory[] = [
    { name: 'Rent', value: 1200, color: '#2563EB' },
    { name: 'Shopping', value: 450, color: '#10B981' },
    { name: 'Food & Dining', value: 250, color: '#EF4444' },
    { name: 'Entertainment', value: 180, color: '#F59E0B' },
    { name: 'Utilities', value: 85, color: '#8B5CF6' },
    { name: 'Health', value: 120, color: '#06B6D4' }
  ];

  transactions: Transaction[] = [
    { icon: '💼', title: 'Monthly Salary', category: 'Salary', date: '12/1/2024', amount: 5000.00, type: 'income' },
    { icon: '🏠', title: 'Apartment Rent', category: 'Rent', date: '12/2/2024', amount: -1200.00, type: 'expense' },
    { icon: '💡', title: 'Electric Bill', category: 'Utilities', date: '12/3/2024', amount: -85.00, type: 'expense' },
    { icon: '🛒', title: 'Grocery Shopping', category: 'Food & Dining', date: '12/5/2024', amount: -250.00, type: 'expense' },
    { icon: '💻', title: 'Web Design Project', category: 'Freelance', date: '12/6/2024', amount: 800.00, type: 'income' }
  ];

  incomeLine: string = '';
  incomePath: string = '';
  expensesLine: string = '';
  expensesPath: string = '';
  pieSegments: any[] = [];


  generateChartPaths() {
    const maxValue = 8000;
    const chartHeight = 300;
    const chartWidth = 700;
    const points = this.incomeExpensesData.length;
    const stepX = chartWidth / (points - 1);

    // Income line
    let incomeLinePoints = '';
    let incomeAreaPoints = '';
    this.incomeExpensesData.forEach((data, i) => {
      const x = 50 + (i * stepX);
      const y = chartHeight - (data.income / maxValue) * chartHeight;
      incomeLinePoints += `${i === 0 ? 'M' : 'L'} ${x},${y} `;
      if (i === 0) incomeAreaPoints = `M ${x},${chartHeight} L ${x},${y} `;
      else incomeAreaPoints += `L ${x},${y} `;
    });
    this.incomeLine = incomeLinePoints;
    this.incomePath = incomeAreaPoints + `L ${50 + (points - 1) * stepX},${chartHeight} Z`;

    // Expenses line
    let expensesLinePoints = '';
    let expensesAreaPoints = '';
    this.incomeExpensesData.forEach((data, i) => {
      const x = 50 + (i * stepX);
      const y = chartHeight - (data.expenses / maxValue) * chartHeight;
      expensesLinePoints += `${i === 0 ? 'M' : 'L'} ${x},${y} `;
      if (i === 0) expensesAreaPoints = `M ${x},${chartHeight} L ${x},${y} `;
      else expensesAreaPoints += `L ${x},${y} `;
    });
    this.expensesLine = expensesLinePoints;
    this.expensesPath = expensesAreaPoints + `L ${50 + (points - 1) * stepX},${chartHeight} Z`;
  }

  generatePieChart() {
    const total = this.spendingData.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90;

    this.pieSegments = this.spendingData.map(item => {
      const percentage = (item.value / total) * 100;
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;

      const outerRadius = 90;
      const innerRadius = 60;

      const startOuterX = outerRadius * Math.cos((startAngle * Math.PI) / 180);
      const startOuterY = outerRadius * Math.sin((startAngle * Math.PI) / 180);
      const endOuterX = outerRadius * Math.cos((endAngle * Math.PI) / 180);
      const endOuterY = outerRadius * Math.sin((endAngle * Math.PI) / 180);

      const startInnerX = innerRadius * Math.cos((endAngle * Math.PI) / 180);
      const startInnerY = innerRadius * Math.sin((endAngle * Math.PI) / 180);
      const endInnerX = innerRadius * Math.cos((startAngle * Math.PI) / 180);
      const endInnerY = innerRadius * Math.sin((startAngle * Math.PI) / 180);

      const largeArc = angle > 180 ? 1 : 0;

      const path = `
        M ${startOuterX} ${startOuterY}
        A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${endOuterX} ${endOuterY}
        L ${startInnerX} ${startInnerY}
        A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${endInnerX} ${endInnerY}
        Z
      `;

      currentAngle = endAngle;

      return {
        path,
        color: item.color,
        percentage
      };
    });
  }

  formatCurrency(amount: number): string {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  addIncome() {
    console.log('Add Income clicked');
  }

  addExpense() {
    console.log('Add Expense clicked');
  }

  setBudget() {
    console.log('Set Budget clicked');
  }


}
