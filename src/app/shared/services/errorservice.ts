import { Injectable } from '@angular/core';
import { Toasterservice } from './toasterservice';

@Injectable({
  providedIn: 'root',
})
export class Errorservice {
  
  constructor(private toasterService:Toasterservice){}

  handleError(error: any): any {
    this.toasterService.error(error.message,3000)
    
  }
}
