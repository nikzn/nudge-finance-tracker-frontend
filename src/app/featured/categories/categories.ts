import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddEditCategories } from './add-edit-categories/add-edit-categories';
import { Navbar } from '../sidemenu/navbar/navbar';
import { NavbarConfig } from '../../shared/interfaces/navbar.interface';
import { CategoriesService } from '../../shared/services/categories-service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Loaderservice } from '../../shared/services/loaderservice';
import { Toasterservice } from '../../shared/services/toasterservice';
import { Loader } from '../../shared/component/loader/loader';
import { ConfirmationService } from 'primeng/api';

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  transaction_type: 'EXPENSE' | 'INCOME';
  color: string;
}


@Component({
  selector: 'app-categories',
  imports: [CommonModule, DynamicDialogModule, Navbar, ConfirmDialogModule, Loader, AsyncPipe],
  providers: [DialogService, ConfirmationService],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {

  config: NavbarConfig = {
    title: 'Categories',
    subtitle: 'Manage your expense and income categories',
    actions: [{
      type: 'primary',
      icon: 'pi pi-plus',
      label: 'Add Categories',
      onClick: () => this.onClickOpenAddTransactionDialog()

    }]
  }

  ref: DynamicDialogRef | null = null;
  categories: Category[] = []
  filteredCategories=signal<Category[]>([])
  constructor(public dialogService: DialogService, private categoriesService: CategoriesService, public loaderService: Loaderservice, public toaster: Toasterservice, private confirmationService: ConfirmationService) {
    this.listCategories()
  }

  listCategories() {
    this.categoriesService.listCategoriesApi().subscribe(res => {
      this.categories = res
      this.filteredCategories.set(this.categories)
      console.log("clasid",this.filteredCategories);
      
    })
  }
  toggleCategory() {
    if (this.activeFilter === 'all') {
      this.filteredCategories.set(this.categories);
    }else{
    this.filteredCategories.update(value=>this.categories.filter(c => c.transaction_type === this.activeFilter))

    }
  }
  activeFilter: 'all' | 'EXPENSE' | 'INCOME' = 'all';

  get totalCategories(): number {
    return this.categories.length;
  }

  get expenseCount(): number {
    return this.categories.filter(c => c.transaction_type === 'EXPENSE').length;
  }

  get incomeCount(): number {
    return this.categories.filter(c => c.transaction_type === 'INCOME').length;
  }



  setFilter(filter: 'all' | 'EXPENSE' | 'INCOME'): void {
    this.activeFilter = filter;
    this.toggleCategory()
  }

  addCategory(): void {
    console.log('Add category clicked');
    // Implement add category logic
  }

  onClickOpenAddTransactionDialog() {
    this.ref = this.dialogService.open(AddEditCategories, {
      showHeader: false,
      modal: true,
      closable: true,
      contentStyle: { overflow: 'hidden', padding: '0px' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      }
    }


    );
    if (this.ref) {
      this.ref.onClose.subscribe((result) => {
        console.log(result);
        
        this.listCategories()
      });
    }




  }

  onClickEditTransactionDialog(categoryId: number){
    this.ref = this.dialogService.open(AddEditCategories, {
      showHeader: false,
      data:{id:categoryId},
      modal: true,
      closable: true,
      contentStyle: { overflow: 'hidden', padding: '0px' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      }
    }


    );
    if (this.ref) {
      this.ref.onClose.subscribe((result) => {
        this.listCategories()
      });
    }
  }

  onClickConfirm(categoryId: number) {
    console.log("Selected category ID:", categoryId);

    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.onClickDelete(categoryId);
      },
      reject: () => {
        console.log('Deletion cancelled');
      },
    });
  }

  onClickDelete(categoryId: number) {
    this.categoriesService.deleteCategoryByIDApi(categoryId).subscribe(res => {
      this.toaster.success("Successfully Deleted")
      this.listCategories()
    })
  }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.ref) {
      this.ref.close();
    }
  }
}
