import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NavegacionComponent } from './administrador/navegacion/navegacion.component';
import { ColaboradoresComponent } from './administrador/colaboradores/colaboradores.component';
import { UbicacionComponent } from './administrador/ubicacion/ubicacion.component';
import { EmpresasComponent } from './administrador/empresas/empresas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'administrador',
    component: NavegacionComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'colaboradores', component: ColaboradoresComponent },
      { path: 'ubicacion', component: UbicacionComponent },
      { path: 'empresas', component: EmpresasComponent },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
