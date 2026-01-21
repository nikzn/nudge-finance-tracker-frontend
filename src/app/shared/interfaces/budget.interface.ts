export interface BudgetRequest{   
  name: string | undefined,
  amount:number,
  category_id:number,
  month:number,
  year:number,
  alert_threshold:number

}

export interface BudgetResponse{
    
  id: number,
  name: string,
  amount: number,
  category_id: number,
  month: number,
  year: number,
  alert_threshold: number,
  spent: number,
  remaining: number,
  percentage_used: number,
  created_at: string

}

export type BudgetList = BudgetResponse &{
flag:boolean

}