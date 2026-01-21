import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BudgetList, BudgetRequest, BudgetResponse } from '../interfaces/budget.interface';

@Injectable({
  providedIn: 'root',
})
export class Budgetservice {
 private baseUrl = environment.apiUrl;
    http = inject(HttpClient)


    budgetUrl = this.baseUrl+'/api/budgets/'

  addBudgetApi(data:BudgetRequest):Observable<BudgetResponse>{
    return this.http.post<BudgetResponse>(this.budgetUrl,{...data})
  }

    listBudgetApi():Observable<BudgetList[]>{
    return this.http.get<any>(this.budgetUrl)
  }

   listBudgetByIDApi(Budget_id:number):Observable<any>{
      return this.http.get<number>(this.budgetUrl+`${Budget_id}`)
    }


   updateBudgetApi(Budget_id:number,data:any):Observable<any>{
      return this.http.put<string>(this.budgetUrl+`${Budget_id}`,{...data})
    }

      deleteBudgetByIDApi(Budget_id:number):Observable<any>{
      return this.http.delete<number>(this.budgetUrl+`${Budget_id}`)
    }
  
}
