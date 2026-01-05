import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CategoriesRequest } from '../interfaces/categories.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
    private baseUrl = environment.apiUrl;
    http = inject(HttpClient)

    listCategoriesURL = this.baseUrl+'/api/categories/';
    
    
    
    addOrEditCategoriesApi(data:CategoriesRequest):Observable<any>{
      return this.http.post<CategoriesRequest>(this.listCategoriesURL,{...data})
    }


        listCategoriesApi():Observable<any>{
      return this.http.get<string>(this.listCategoriesURL)
    }

    listCategoryByIDApi(category_id:number):Observable<any>{
      return this.http.get<number>(this.listCategoriesURL+`${category_id}`)
    }


   updateCategoryApi(category_id:number,data:any):Observable<any>{
      return this.http.put<string>(this.listCategoriesURL+`${category_id}`,{...data})
    }

      deleteCategoryByIDApi(category_id:number):Observable<any>{
      return this.http.delete<number>(this.listCategoriesURL+`${category_id}`)
    }



}
