import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-transactions',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-edit-transactions.html',
  styleUrl: './add-edit-transactions.css',
})
export class AddEditTransactions {
transactionType: 'income' | 'expense' = 'expense';
  amount: number = 0;
  category: string = '';
  description: string = '';
  date: string = '2026-01-05';

  closeModal() {
    console.log('Close modal');
  }

  addTransaction() {
    const transaction = {
      type: this.transactionType,
      amount: this.amount,
      category: this.category,
      description: this.description,
      date: this.date
    };
    console.log('Transaction added:', transaction);
  }




}
