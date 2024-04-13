import { Injectable } from '@angular/core';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  
  initializerLoader(message:any): void {
    Loading.custom(message, {
        customSvgUrl: 'assets/images/loadings.gif',
        }); 
    }
    removeLoader(timeout?: any): void {
    Loading.remove(timeout);
  }
}
