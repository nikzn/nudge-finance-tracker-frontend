import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from 'primeng/select';
import { CategoriesService } from '../../../shared/services/categories-service';
import { Budgetservice } from '../../../shared/services/budgetservice';
import { CategoriesResponse } from '../../../shared/interfaces/categories.interface';
import { Toasterservice } from '../../../shared/services/toasterservice';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-edit-budget',
  imports: [CommonModule, FormsModule, Select, ReactiveFormsModule],
  templateUrl: './add-edit-budget.html',
  styleUrl: './add-edit-budget.css',
})
export class AddEditBudget implements OnInit {

  constructor(private categoriesService: CategoriesService, private ref: DynamicDialogRef, private budgetService: Budgetservice, private toasterService: Toasterservice) { }
  categoriesList = signal<CategoriesResponse[]>([])

  budgetForm: FormGroup = new FormGroup({
    category: new FormControl(['', Validators.required]),
    amount: new FormControl(['', Validators.required])
  })

  ngOnInit(): void {
    this.onListCategories()
  }


  onListCategories() {
    this.categoriesService.listCategoriesApi().subscribe(res => {
      this.categoriesList.set(res)
    })
  }


  onClose() {
  this.ref.close()
  }

  onsubmit() {
    if (this.budgetForm.valid) {
      let request = {
        name: this.categoriesList().find(cat=>cat.id === this.budgetForm.value.category )?.name,
        amount: this.budgetForm.value.amount,
        category_id:this.budgetForm.value.category ,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        alert_threshold:100 
}
      this.budgetService.addBudgetApi(request).subscribe(res => {
        this.toasterService.success("Added Successfully!!")
        this.ref.close()
      })
    } else {
      this.toasterService.warning("Please fill neccessary fields!!")

    }
  }

}
