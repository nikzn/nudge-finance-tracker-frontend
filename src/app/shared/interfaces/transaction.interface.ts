import { CategoriesResponse } from "./categories.interface"

export interface AddTransaction{
    
  amount:number,
  description:string,
  transaction_type:string,
  category_id:number,
  custom_type_id:number,
  transaction_date:string,
  notes:string

}

export interface TransactionList{
  page:number,
page_size:number,
total_count:number,
total_expense:number,
total_income:number,
transactions:Transaction[]
}

export interface Transaction{
amount:number,
category:CategoriesResponse,
category_id:number
created_at:string,
custom_type_id:number,
description:string,
id:number,
notes:string,
transaction_date:string,
transaction_type:string,
updated_at:string
}