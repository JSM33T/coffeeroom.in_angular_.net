import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getUserDataFromToken } from '../../library/utility/token-utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData = new BehaviorSubject<any>(null);
  userData$ = this.userData.asObservable();

  constructor() {
    this.loadUserDataFromToken();
  }

  loadUserDataFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = getUserDataFromToken(token);
      if (userData) {
        this.userData.next(userData);
        console.log('form userservice');
        console.log(userData);
      }
    }
  }
}
