import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../../shared/services/categories-service';
import { Transactionsservice } from '../../../shared/services/transactionsservice';
import { takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriesResponse, TransactionType } from '../../../shared/interfaces/categories.interface';
import { Categories } from '../../categories/categories';
import { DynamicDialog, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { Toasterservice } from '../../../shared/services/toasterservice';
@Component({
  selector: 'app-add-edit-transactions',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DatePickerModule],
  templateUrl: './add-edit-transactions.html',
  styleUrl: './add-edit-transactions.css',
})
export class AddEditTransactions implements OnInit {

  constructor(private categoriesService: CategoriesService,
    private transactionService: Transactionsservice,
    private destroyRef: DestroyRef,
    private ref: DynamicDialogRef,
    private toasterService: Toasterservice,private config:DynamicDialogConfig
  ) {
    
  }


  id!:number;
  transactionType: TransactionType = 'expense';
  categoryForm: FormGroup = new FormGroup({
    amount: new FormControl(0, [Validators.required, Validators.min(1)]),
    category_id: new FormControl('', Validators.required),
    description: new FormControl(''),
    transaction_date: new FormControl(new Date(), Validators.required)
  })
  categoryList = signal<CategoriesResponse[]>([])



  ngOnInit(): void {
    if (this.config?.data && this.config?.data['id']) {
      this.id = this.config?.data['id'];
      this.getTransaction(this.id);
    }
    this.listCategories()
  }




  listCategories() {
    this.categoriesService.listCategoriesApi().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.categoryList.set(res)
      }
    })
  }

getTransaction(id:number){
this.transactionService.listTransactionByIDApi(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
  next:(res)=>{
   const {
  amount,
  category_id,
  description,
  transaction_date,
  transaction_type
} = res;

this.transactionType = transaction_type;

this.categoryForm.patchValue({
  amount,
  category_id,
  description,
  transaction_date: new Date(transaction_date)
});

    
  }
})

}

  closeModal() {
    this.ref?.close()
  }

  addTransaction() {
    if (this.categoryForm.valid) {

      let request = {
        "custom_type_id": this.transactionType.toLowerCase() == 'income' ? 1 : 2,
        "notes": " ",
        "transaction_type": this.transactionType.toUpperCase(),
        ...this.categoryForm.value
      }


      if(this.id){
this.transactionService.updateTransactionApi(this.id,request).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          this.ref.close()
          this.toasterService.success("updated Successfully")
        }

      })
      }else{
  this.transactionService.addTransactionApi(request).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          this.ref.close()
          this.toasterService.success("Added Successfully")
        }

      })
      }

    

    }else{
      this.toasterService.warning("Fill the necessery Fields")
    }


  }




  get amount(): FormControl {
    return this.categoryForm.get('amount') as FormControl;
  }

  get categories(): FormControl {
    return this.categoryForm.get('category_id') as FormControl;
  }


  get TransactionDate(): FormControl {
    return this.categoryForm.get('transaction_date') as FormControl;
  }




}
