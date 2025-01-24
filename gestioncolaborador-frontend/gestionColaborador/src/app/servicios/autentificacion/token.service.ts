import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  saveSecure(insecure: boolean) {
    localStorage.setItem('insecure', insecure.toString());
  }
  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }
  getSecure() {
    const token = localStorage.getItem('insecure');
    return token;
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
