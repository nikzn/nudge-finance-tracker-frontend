import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Userservice {
  
    http=inject(HttpClient)

  environment=environment;
  baseUrl= environment.apiUrl;

  userNameURL:string=`${this.baseUrl}/api/auth/isUsernameExists`;


  userNameApi(name:string):Observable<any>{
    return this.http.post<any>(this.userNameURL,{name})
  }


}
