import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../servicios/autentificacion/token.service';
import { AuthService } from '../servicios/autentificacion/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Verificar si hay un token y un usuario cargado en el perfil
    if (
      this.tokenService.getToken() &&
      this.authService.getCurrentUserValue()
    ) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirigir a /login
      return false;
    }
  }
}
