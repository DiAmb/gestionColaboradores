import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../servicios/autentificacion/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  mail: string = '';
  password: string = '';
  loginValid: boolean = true;
  year: number = new Date().getFullYear();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Si hay lógica adicional de inicialización, inclúyela aquí.
  }

  login(): void {
    if (this.mail && this.password) {
      this.authService
        .login(this.mail, this.password)
        .pipe(
          catchError((error) => {
            console.error('Error al iniciar sesión:', error);
            this.loginValid = false;
            return throwError(error);
          })
        )
        .subscribe((user) => {
          if (user) {
            this.loginValid = true;
            this.router.navigate(['./administrador']);
          } else {
            this.loginValid = false;
          }
        });
    } else {
      this.loginValid = false;
    }
  }
}
