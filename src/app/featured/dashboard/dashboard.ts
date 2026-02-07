import { Component, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard-service';
import { Navbar } from "../sidemenu/navbar/navbar";
import { NavbarConfig } from '../../shared/interfaces/navbar.interface';
import { Stats } from './stats/stats';
import { LineChart } from "../../shared/component/line-chart/line-chart";
import { CommonModule } from '@angular/common';
import { DonutChart } from "../../shared/component/donut-chart/donut-chart";
import { Transaction } from '../../shared/interfaces/transaction.interface';
import { AddEditTransactions } from '../transactions/add-edit-transactions/add-edit-transactions';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddEditBudget } from '../budget/add-edit-budget/add-edit-budget';


export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}

export interface SpendingCategory {
  amount: number;
  category: number;
  percentage: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, Stats, LineChart, CommonModule, DonutChart],
  providers:[DialogService],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
    ref: DynamicDialogRef<AddEditTransactions> | null = null;
 ref1: DynamicDialogRef<AddEditBudget> | null = null;

  constructor(private dashboardService:DashboardService,public dialogService: DialogService){}
  
  config: NavbarConfig = {
      title: 'Dashboard',
      subtitle: `Welcome back! Here's your financial overview.`,
      actions: []
    }

   incomeExpensesData = signal<MonthlyData[] | []>([]);
   spendingByCategoryData = signal<SpendingCategory[]|[]>([])
   transactionData = signal<Transaction[]>([]) 
   statsData = signal<unknown>([])
  ngOnInit(): void {   
   this.listData()
  }


listData(){
   this.dashboardService.getDashboardData().subscribe(res=>{
      console.log(res)
      this.transactionData.set(res[0]?.recent_transactions || [])
      this.incomeExpensesData.set(res[3]?.data||[])
      this.statsData.set(res[1])
      console.log(this.statsData())
      const updatedTransactrion =res[2]?.data.slice(0,5)
      this.spendingByCategoryData.set(updatedTransactrion || [])
    })
}







  formatCurrency(amount: number): string {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  addIncome() {
    
       
        this.ref = this.dialogService.open(AddEditTransactions, {
          data:{"id":null},
          showHeader: false,
          modal: true,
          closable: true,
           contentStyle: { overflow: 'hidden', padding: '0px' },
          breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
          }
        });
    
          if (this.ref) {
          this.ref.onClose.subscribe((result) => {
    
            this.listData()
          });
        }
    
    
      
  }

  addExpense() {
    console.log('Add Expense clicked');
  }

  setBudget() {
       this.ref1 = this.dialogService.open(AddEditBudget, {         
             showHeader: false,
             modal: true,
             closable: true,
              contentStyle: { overflow: 'hidden', padding: '0px' },
             breakpoints: {
               '960px': '75vw',
               '640px': '90vw'
             }
           });
       
             if (this.ref1) {
             this.ref1.onClose.subscribe((result) => {
       
            this.listData()
             });
           }
  }


}
