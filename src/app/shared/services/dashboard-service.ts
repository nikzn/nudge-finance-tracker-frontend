import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  baseUrl = environment.apiUrl
  private http = inject(HttpClient)

  dashboardUrl = this.baseUrl+'/api/dashboard/'
  dashboardSummaryUrl = this.baseUrl+'/api/dashboard/summary'
  dashboardCategoryDistrubutionUrl = this.baseUrl+'/api/dashboard/charts/category-distribution'
  dashboardMonthlyTrendUrl = this.baseUrl+'/api/dashboard/charts/monthly-trend'


  getDashboardApi():Observable<any>{
    return this.http.get<any>(this.dashboardUrl)
  }


    dashboardSummaryApi():Observable<any>{
    return this.http.get<any>(this.dashboardSummaryUrl)
  }

    dashboardCategoryDistrubutionApi():Observable<any>{
    return this.http.get<any>(this.dashboardCategoryDistrubutionUrl)
  }

    dashboardMonthlyTrendApi():Observable<any>{
    return this.http.get<any>(this.dashboardMonthlyTrendUrl)
  }


  getDashboardData():Observable<any>{
      const getDashboardApi$ = this.getDashboardApi()
       const dashboardSummaryApi$ = this.dashboardSummaryApi()
        const dashboardCategoryDistrubutionApi$ = this.dashboardCategoryDistrubutionApi()
         const dashboardMonthlyTrendApi$ = this.dashboardMonthlyTrendApi()

         return forkJoin([getDashboardApi$,dashboardSummaryApi$,dashboardCategoryDistrubutionApi$,dashboardMonthlyTrendApi$])
  }

  
}
