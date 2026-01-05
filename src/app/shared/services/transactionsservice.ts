import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AddTransaction } from '../interfaces/transaction.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Transactionsservice {
   private readonly baseUrl = environment.apiUrl
   private http = inject(HttpClient)

   getTransactionListURL = this.baseUrl+'/api/transactions';


  getTransactionListApi(data:AddTransaction):Observable<any>{
    return this.http.post<AddTransaction>(this.getTransactionListURL,{...data})
  }


}