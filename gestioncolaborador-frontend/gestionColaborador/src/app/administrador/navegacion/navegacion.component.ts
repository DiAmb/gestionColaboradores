import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from 'src/app/servicios/autentificacion/auth.service';
import { TokenService } from 'src/app/servicios/autentificacion/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css'],
})
export class NavegacionComponent {
  private breakpointObserver = inject(BreakpointObserver);

  constructor(
    public authService: AuthService,
    public tokenService: TokenService,
    public router: Router
  ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  userName: string | null = null;

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.userName =
        user?.nombres_personal + ' ' + user?.apellidos_personal || 'Usuario';
    }
  }
  logout() {
    this.authService.removeUserFromLocalStorage();
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }
}
