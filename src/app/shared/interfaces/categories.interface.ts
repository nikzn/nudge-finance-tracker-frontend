export type TransactionType = 'income' | 'expense' | 'INCOME' | 'EXPENSE';
export interface CategoriesRequest {
  name: string;
  description: string;
  icon: string;
  color: string;
  transaction_type: TransactionType;
}

export type CategoriesResponse = CategoriesRequest & {
  id: number;
  created_at: string;
};
