import { Component, DestroyRef, ElementRef, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Transactionsservice } from '../../shared/services/transactionsservice';
import { Navbar } from "../sidemenu/navbar/navbar";
import { NavbarConfig } from '../../shared/interfaces/navbar.interface';
import { FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddEditTransactions } from './add-edit-transactions/add-edit-transactions';
import { Transaction } from '../../shared/interfaces/transaction.interface';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Toasterservice } from '../../shared/services/toasterservice';
import { takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Loaderservice } from '../../shared/services/loaderservice';
import { Loader } from '../../shared/component/loader/loader';
import { Select } from 'primeng/select';
import { Categories } from '../categories/categories';
import { CategoriesResponse } from '../../shared/interfaces/categories.interface';
@Component({
  selector: 'app-transactions',
  imports: [Navbar, FormsModule, DynamicDialogModule,DatePipe,ConfirmDialogModule,AsyncPipe,Loader,Select],
  providers: [DialogService,ConfirmationService],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions implements OnInit, OnDestroy {

 
  constructor(public loaderService:Loaderservice, public dialogService: DialogService, private transactionService: Transactionsservice,private elementRef: ElementRef,private confirmationService:ConfirmationService,private toasterService:Toasterservice,private destroyRef:DestroyRef) { }

  openMenuIndex: number | null = null;
   items: MenuItem[] | undefined;
  ref: DynamicDialogRef<AddEditTransactions> | null = null;
  config: NavbarConfig = {
    title: 'Transactions',
    subtitle: 'View and manage all your transactions',
    actions: [{
      type: 'primary',
      icon: 'pi pi-plus',
      label: 'Add Transaction',
      onClick: () => this.onClickOpenAddTransactionDialog()

    }]
  }
  tempTransaction:Transaction[]=[]
  transactions= signal<Transaction[]>([])
  searchTerm = '';
  totalIncome = signal<number>(0)
  totalExpenses = signal<number>(0);
  totalCount = signal<number>(0);
  types:'income'|'expense'|'all' = 'all'
  transactionTypes = signal<any[]>(["all","income","expense"])
  categoriesList = signal<CategoriesResponse[]>([])
  sortByList = signal<any[]>(['amount','date'])
  categorieId!:number
  sortBy:string='date'


  ngOnInit(): void {
   this.listTransactions()
  }



  toggleMenu(index:number) {
   this.openMenuIndex = this.openMenuIndex === index ? null : index;
  }

applyFilters() {
  let data = [...this.tempTransaction]; // clone to avoid mutation

  const term = this.searchTerm?.trim().toLowerCase();

  // 🔍 Search
  if (term) {
    data = data.filter(txn =>
      txn.description?.toLowerCase().includes(term) ||
      txn.amount?.toString().includes(term) ||
      txn.transaction_date?.toString().toLowerCase().includes(term)
    );
  }

  // 📂 Category filter
  if (this.categorieId) {
    data = data.filter(
      txn => txn.category?.id === this.categorieId
    );
  }

  // 🔄 Transaction type
  if (this.types && this.types !== 'all') {
    data = data.filter(
      txn => txn.transaction_type === this.types
    );
  }

  // ↕ Sorting
  if (this.sortBy === 'date') {
    data = data.sort(
      (a, b) =>
        new Date(b.transaction_date).getTime() -
        new Date(a.transaction_date).getTime()
    );
  } else if (this.sortBy === 'amount') {
    data = data.sort((a, b) => b.amount - a.amount);
  }

  this.transactions.set(data);
}

onChangeSearch() {
  this.applyFilters();
}

onFilterByCategory() {
  this.applyFilters();
}

onFilterbyTransaction() {
  this.applyFilters();
}

onFilterSortby() {
  this.applyFilters();
}


  onDelete(id:number) {
       this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Are you sure you want to delete.',
            icon: 'pi pi-exclamation-circle',
           rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
            acceptButtonProps: {
                label: 'Delete',
                icon: 'pi pi-check',
                severity:'danger'
            },
            accept: () => {
                this.transactionService.deleteTransactionByIDApi(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res=>{
                  this.toasterService.success("delete")
                  this.listTransactions()
                })
            },
            reject: () => {
            }
        });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.openMenuIndex = null;
    }
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

  listTransactions(){
    this.transactionService.listTransactionApi().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res=>{
      this.transactions.set(res.transactions)
      this.tempTransaction = res.transactions
      this.totalCount.set(res.total_count)
      this.totalExpenses.set(res.total_expense)
      this.totalIncome.set(res.total_income)
      
const uniqueData:any = [...new Map(
  res.transactions.map(item => [item.category.id, item.category])
).values()];
      this.categoriesList.set(uniqueData)
      
      
    })
  }




  onClickOpenAddTransactionDialog(id:number|null=null) {
    this.openMenuIndex=null;
    this.ref = this.dialogService.open(AddEditTransactions, {
      data:{"id":id},
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

        this.listTransactions()
      });
    }


  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }

  }

}