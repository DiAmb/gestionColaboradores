import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/autenticacion`;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.restoreUserFromLocalStorage();
  }
  private user = new BehaviorSubject<any | null>(null);
  user$ = this.user.asObservable();

  login(email: string, password: string) {
    return this.http
      .post<any>(`${this.apiUrl}/`, {
        correo: email,
        contrasena: password,
      })
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.body.token);
          this.tokenService.saveSecure(response.body.insecure);
        }),
        switchMap((response) => {
          return this.http
            .get<any>(`${environment.API_URL}/empleados/${response.body.cui}`)
            .pipe(
              map((userDataResponse) => userDataResponse.body),
              tap((userDataBody) => {
                this.user.next(userDataBody);
                localStorage.setItem('user', JSON.stringify(userDataBody));
              })
            );
        })
      );
  }
  loginDump(email: string, password: string) {
    return this.http
      .post<any>(`${this.apiUrl}/`, {
        correo: email,
        contrasena: password,
      })
      .pipe(
        map((response) => {
          return true;
        }),
        catchError((error) => {
          return of(false);
        })
      );
  }

  restoreUserFromLocalStorage() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const userData = JSON.parse(userJson);
      if (userData && typeof userData === 'object' && userData !== null) {
        this.user.next(userData);
      }
    }
  }
  getProfile() {
    return this.http.get<any>(`${this.apiUrl}/empleados`).pipe(
      tap((user) => {
        this.user.next(user);
      })
    );
  }
  removeUserFromLocalStorage() {
    localStorage.removeItem('user');
    this.user.next(null);
  }

  loginAndGet(
    correo_autentificacion: string,
    contrasena_autentificacion: string
  ) {
    return this.login(correo_autentificacion, contrasena_autentificacion).pipe(
      switchMap(() => this.getProfile())
    );
  }
  getCurrentUserValue() {
    return this.user.getValue();
  }
  resetPassword(cui: string, email: string, newPassword: string) {
    const url = `${this.apiUrl}/reset/${cui}`;
    return this.http.post<any>(url, {
      correo_autentificacion: email,
      contrasena_autentificacion: newPassword,
    });
  }
}
