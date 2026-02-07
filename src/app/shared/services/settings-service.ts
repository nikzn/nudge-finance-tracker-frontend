import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private http = inject(HttpClient)
  private settingsURL = '/api/users/profile'


  updateName(request:any):Observable<any>{
    return this.http.put<any>(this.settingsURL,{...request})
  }

  
}
