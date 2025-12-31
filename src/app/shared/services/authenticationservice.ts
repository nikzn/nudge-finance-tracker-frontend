import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse, RegisterResponse, SigupRequest } from '../interfaces/login.interface';
import { userDetails } from '../interfaces/authResponse.interface';
import { Router } from '@angular/router';
import { Toasterservice } from './toasterservice';

@Injectable({
  providedIn: 'root',
})
export class Authenticationservice {
  private readonly ACCESS_TOKEN_KEY = 'access_token'
  private readonly REFRESH_TOKEN = 'refresh token'
  private readonly USER_KEY = 'user_details'

  private currentUserSubject = new BehaviorSubject<userDetails | null>(this.getUserFromStorage())
  public currentUser$ = this.currentUserSubject.asObservable()


  http = inject(HttpClient)
  router = inject(Router)
  toaster = inject(Toasterservice)

  private baseUrl = environment.apiUrl;

  private loginURL: string = `${this.baseUrl}/api/auth/login`;
  private registerURL: string = `${this.baseUrl}/api/auth/register`;
  private refreshTokenURL:string = `${this.baseUrl}/api/auth/refresh`;


  loginApi(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginURL, { ...data })
      .pipe(tap(response => this.handleResponse(response)))
  }

  registerApi(data: SigupRequest): Observable<any> {
    return this.http.post<SigupRequest>(this.registerURL, { ...data })
  }

  refreshTokenApi(token:string):Observable<any>{
    return this.http.post<any>(this.refreshTokenURL,token)
  }


  handleResponse(response: LoginResponse) {
    this.setUserData(response.user)
    this.setAccessToken(response.access_token)
    this.setRefreshToken(response.refresh_token)

  }

   setUserData(response: userDetails) {
    const userDetails = JSON.stringify(response)
    localStorage.setItem(this.USER_KEY, userDetails)
  }

   setAccessToken(accessToken: string) {
    const accessTokenStringfy = JSON.stringify(accessToken)
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessTokenStringfy)
  }

   setRefreshToken(refreshToken: string) {
    const refreshTokenStringFy = JSON.stringify(refreshToken)
    localStorage.setItem(this.REFRESH_TOKEN, refreshTokenStringFy)
  }

   getUserFromStorage(): userDetails | null {
    const userData = localStorage.getItem(this.USER_KEY)
    return userData ? JSON.parse(userData) : null
  }


     getRefreshTokenFromStorage(): string | null {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN)
    return refreshToken ? JSON.parse(refreshToken) : null
  }


     getAccessTokenFromStorage(): string | null {
    const accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY)
    return accessToken ? JSON.parse(accessToken) : null
  }


   isAuthenticated():boolean{
    return !!this.getAccessTokenFromStorage()
  }

   getCurrentUser():userDetails|null{
    return this.currentUserSubject.value
  }

  logOut(){
    localStorage.clear()
    this.toaster.error('Logged Out')
    this.router.navigate(['/'])
  }

}
