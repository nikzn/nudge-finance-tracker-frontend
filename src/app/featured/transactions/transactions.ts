import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Transactionsservice } from '../../shared/services/transactionsservice';
import { Navbar } from "../sidemenu/navbar/navbar";
import { NavbarConfig } from '../../shared/interfaces/navbar.interface';
import { FormsModule } from '@angular/forms';
  import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddEditTransactions } from './add-edit-transactions/add-edit-transactions';
@Component({
  selector: 'app-transactions',
  imports: [Navbar,FormsModule,DynamicDialogModule],
  providers:[DialogService],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions implements OnInit,OnDestroy {
private transactionService = inject(Transactionsservice)

 constructor(public dialogService: DialogService) {}
  ref: DynamicDialogRef | undefined;
config:NavbarConfig ={
title:'Transactions',
subtitle:'View and manage all your transactions',
actions:[{
  type:'primary',
  icon:'pi pi-plus',
  label:'Add Transaction',
  onClick:()=>this.onClickOpenAddTransactionDialog()

}]
}
transactions: any[] = [];
  searchTerm = '';
 totalIncome = 0;
  totalExpenses = 0;
  totalCount = 0;

ngOnInit(): void {
  //this.addTransactions()
}

openSettings(): void {
    alert('Opening settings...');
  }

  openProfile(): void {
    alert('Opening profile...');
  }

  addTransaction(): void {
    alert('Opening add transaction form...');
  }

  getTransactionIcon(iconName: string): string {
    const icons: { [key: string]: string } = {
      'briefcase': '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
      'home': '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>',
      'lightbulb': '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>'
    };
    return icons[iconName] || '';
  }

// addTransactions(){
// this.transactionService.getTransactionListApi().subscribe(res=>{
//   console.log(res);
  
// })


// }


onClickOpenAddTransactionDialog(){
 this.dialogService.open(AddEditTransactions, {
            showHeader:false,
            width: '50vw',
            modal: true,
            closable:true,
            contentStyle: { overflow: 'auto' },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            }
        });



}

ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }

}

}