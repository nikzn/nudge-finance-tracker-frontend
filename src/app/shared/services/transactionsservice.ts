import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AddTransaction, TransactionList } from '../interfaces/transaction.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Transactionsservice {
   private readonly baseUrl = environment.apiUrl
   private http = inject(HttpClient)

   transactionURL = this.baseUrl+'/api/transactions/';


  addTransactionApi(data:AddTransaction):Observable<any>{
    return this.http.post<AddTransaction>(this.transactionURL,{...data})
  }

    listTransactionApi():Observable<TransactionList>{
    return this.http.get<any>(this.transactionURL)
  }

   listTransactionByIDApi(transaction_id:number):Observable<any>{
      return this.http.get<number>(this.transactionURL+`${transaction_id}`)
    }


   updateTransactionApi(transaction_id:number,data:any):Observable<any>{
      return this.http.put<string>(this.transactionURL+`${transaction_id}`,{...data})
    }

      deleteTransactionByIDApi(transaction_id:number):Observable<any>{
      return this.http.delete<number>(this.transactionURL+`${transaction_id}`)
    }

  


}