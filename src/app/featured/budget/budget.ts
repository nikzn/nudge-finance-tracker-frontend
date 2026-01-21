import { CommonModule } from '@angular/common';
import { Component, DestroyRef, ElementRef, OnInit, signal } from '@angular/core';
import { Navbar } from "../sidemenu/navbar/navbar";
import { NavbarConfig } from '../../shared/interfaces/navbar.interface';
import { AddEditBudget } from './add-edit-budget/add-edit-budget';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Loaderservice } from '../../shared/services/loaderservice';
import { Toasterservice } from '../../shared/services/toasterservice';
import { Budgetservice } from '../../shared/services/budgetservice';
import { BudgetList, BudgetResponse } from '../../shared/interfaces/budget.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FormsModule } from "@angular/forms";

interface Category {
  id: number;
  name: string;
  spent: number;
  budget: number;
  icon: string;
}

@Component({
  selector: 'app-budget',
  imports: [CommonModule, Navbar, ConfirmDialog, FormsModule],
  providers:[DialogService,ConfirmationService],
  templateUrl: './budget.html',
  styleUrl: './budget.css',
})
export class Budget implements OnInit{

  constructor(public loaderService:Loaderservice, public dialogService: DialogService, private budgetService: Budgetservice,private elementRef: ElementRef,private confirmationService:ConfirmationService,private toasterService:Toasterservice,private destroyRef:DestroyRef) { }

    config: NavbarConfig = {
      title: 'Budgets',
      subtitle: 'Set and track your monthly spending limits',
      actions: [{
        type: 'primary',
        icon: 'pi pi-plus',
        label: 'Add Budget',
        onClick: () => this.onClickOpenAddBudgetDialog()
  
      }]
    }

 Math = Math;
  ref: DynamicDialogRef<AddEditBudget> | null = null;
 budgetList = signal<BudgetList[]>([])
amount!:number

  ngOnInit(): void {
    this.listBudget()
  }

  listBudget(){
    this.budgetService.listBudgetApi().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res=>{
      console.log(res);
        res.forEach(re=>re.flag =false)
        this.budgetList.set(res)
    })
  }

  get totalBudget(): number {
    return this.budgetList().reduce((sum, cat) => sum + cat.amount, 0);
  }

  get totalSpent(): number {
    return this.budgetList().reduce((sum, cat) => sum + cat.spent, 0);
  }

  get overallProgress(): number {
    return this.totalBudget > 0 ? (this.totalSpent / this.totalBudget) * 100 : 0;
  }
  onClickOpenAddBudgetDialog(){

     this.ref = this.dialogService.open(AddEditBudget, {         
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
    
         this.listBudget()
          });
        }

  }
  onClickEditBudget(category:BudgetList){
    this.amount = category.amount
    category.flag =!category.flag
     
  }
  cancelEdit(category:BudgetList){
  
    category.flag =!category.flag
  }
  getPercentageUsed(spent: number, budget: number): number {
    return budget > 0 ? (spent / budget) * 100 : 0;
  }

  formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }

  editCategory(category: Category): void {
    console.log('Edit category:', category);
    // Implement edit logic here
  }

  deleteCategory(id: number): void {
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
                this.budgetService.deleteBudgetByIDApi(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res=>{
                  this.toasterService.success("Deleted Successfully")
                  this.listBudget()
                })
            },
            reject: () => {
            }
        });
  }


updateValue(category:BudgetList){

  this.budgetService.updateBudgetApi(category.id,{amount:this.amount}).subscribe(res=>{
    this.toasterService.success("Updated Successfully")
    this.listBudget()
  })

}


}


