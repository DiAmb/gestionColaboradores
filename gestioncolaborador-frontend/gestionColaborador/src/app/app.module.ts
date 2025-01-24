import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { MatSelectModule } from '@angular/material/select';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NavegacionComponent } from './administrador/navegacion/navegacion.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { ColaboradoresComponent } from './administrador/colaboradores/colaboradores.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddColaboradorComponent } from './dialogs/add-colaborador/add-colaborador.component';
import { EditColaboradorComponent } from './dialogs/edit-colaborador/edit-colaborador.component';
import { UbicacionComponent } from './administrador/ubicacion/ubicacion.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AddPaisComponent } from './dialogs/add-pais/add-pais.component';
import { AddDepartamentoComponent } from './dialogs/add-departamento/add-departamento.component';
import { AddMunicipioComponent } from './dialogs/add-municipio/add-municipio.component';
import { EditPaisComponent } from './dialogs/edit-pais/edit-pais.component';
import { EditDepartamentoComponent } from './dialogs/edit-departamento/edit-departamento.component';
import { EditMunicipioComponent } from './dialogs/edit-municipio/edit-municipio.component';
import { EmpresasComponent } from './administrador/empresas/empresas.component';
import { EditEmpresaComponent } from './dialogs/edit-empresa/edit-empresa.component';
import { AddEmpresaComponent } from './dialogs/add-empresa/add-empresa.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavegacionComponent,
    ColaboradoresComponent,
    AddColaboradorComponent,
    EditColaboradorComponent,
    UbicacionComponent,
    AddPaisComponent,
    AddDepartamentoComponent,
    AddMunicipioComponent,
    EditPaisComponent,
    EditDepartamentoComponent,
    EditMunicipioComponent,
    EmpresasComponent,
    EditEmpresaComponent,
    AddEmpresaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatTabsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
