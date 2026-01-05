import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../../shared/services/categories-service';
import { DynamicDialog, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Toasterservice } from '../../../shared/services/toasterservice';

interface CategoryColor {
  name: string;
  value: string;
}

interface CategoryIcon {
  name: string;
  icon: string;
}


@Component({
  selector: 'app-add-edit-categories',
  imports: [ CommonModule,
    FormsModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-edit-categories.html',
  styleUrl: './add-edit-categories.css',
})
export class AddEditCategories implements OnInit {

  categoriesService = inject(CategoriesService)
  ref= inject(DynamicDialogRef)
  toaster = inject(Toasterservice)
 config = inject(DynamicDialogConfig);
  id!:number
  categoriesForm:FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required])

  })

  ngOnInit(): void {
    if (this.config.data && this.config.data['id']) {
      this.id = this.config.data['id'];
      this.getCategory(this.id);
    }
  }


  visible: boolean = true;
  categoryName: string = '';
  categoryDescription: string = '';
  transactionType: 'EXPENSE' | 'INCOME' = 'EXPENSE';
  selectedColor: string = '#3B82F6';
  selectedIcon: string = 'pi pi-fork';

  colors: CategoryColor[] = [
    { name: 'yellow', value: '#EAB308' },
    { name: 'green', value: '#22C55E' },
    { name: 'red', value: '#EF4444' },
    { name: 'blue', value: '#3B82F6' },
    { name: 'purple', value: '#A855F7' },
    { name: 'pink', value: '#EC4899' },
    { name: 'orange', value: '#F97316' },
    { name: 'teal', value: '#14B8A6' }
  ];

  icons: CategoryIcon[] = [
    { name: 'utensils', icon: 'pi pi-fork' },
    { name: 'car', icon: 'pi pi-car' },
    { name: 'home', icon: 'pi pi-home' },
    { name: 'shopping', icon: 'pi pi-shopping-bag' },
    { name: 'heart', icon: 'pi pi-heart' },
    { name: 'game', icon: 'pi pi-box' },
    { name: 'graduation', icon: 'pi pi-book' },
    { name: 'briefcase', icon: 'pi pi-briefcase' },
    { name: 'plane', icon: 'pi pi-send' },
    { name: 'gift', icon: 'pi pi-gift' },
    { name: 'wallet', icon: 'pi pi-wallet' },
    { name: 'chart', icon: 'pi pi-chart-line' },
    { name: 'bolt', icon: 'pi pi-bolt' },
    { name: 'mobile', icon: 'pi pi-mobile' },
    { name: 'coffee', icon: 'pi pi-coffee' },
    { name: 'music', icon: 'pi pi-volume-up' }
  ];

  selectTransactionType(type: 'EXPENSE' | 'INCOME') {
    this.transactionType = type;
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  selectIcon(icon: string) {
    this.selectedIcon = icon;
  }

  onCancel() {
    this.visible = false;
    // Emit cancel event or close dialog
  }


getCategory(category_id:number){
this.categoriesService.listCategoryByIDApi(category_id).subscribe(res=>{
  this.categoriesForm.patchValue({
    name:res.name,
    description:res.description
  })
  this.selectedColor =res.color
  this.selectedIcon =res.icon
  this.transactionType = res.transaction_type.toUpperCase()
})

}

  onUpdate(){
const data = {
      name: this.categoriesForm.value.name,
      description: this.categoriesForm.value.description,
      transaction_type: this.transactionType,
      color: this.selectedColor,
      icon: this.selectedIcon
    };


    this.categoriesService.updateCategoryApi(this.id,data).subscribe(res=>{
   this.toaster.success("Categories Updated")
      this.ref.close()
    })

  }

  onCreate() {
    const data = {
      name: this.categoriesForm.value.name,
      description: this.categoriesForm.value.description,
      transaction_type: this.transactionType,
      color: this.selectedColor,
      icon: this.selectedIcon
    };


    this.categoriesService.addOrEditCategoriesApi(data).subscribe(res=>{
   this.toaster.success("Categories Added")
      this.ref.close()
    })
   
    // Emit create event with category data
  }
}
