import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class UbicacionService {
  private apiUrl = `${environment.API_URL}/ubicacion`;

  constructor(private http: HttpClient) {}

  // Obtener todos los países
  getAllPaises(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/paises`)
      .pipe(map((response: any) => response));
  }

  // Obtener todos los departamentos por ID de país
  getDepartamentosByPais(idPais: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/departamentos/${idPais}`)
      .pipe(map((response: any) => response));
  }

  // Obtener todos los municipios por ID de departamento
  getMunicipiosByDepartamento(idDepartamento: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/municipios/${idDepartamento}`)
      .pipe(map((response: any) => response));
  }

  // Crear un nuevo país
  createPais(dto: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/paises`, dto)
      .pipe(map((response: any) => response));
  }

  // Crear un nuevo departamento
  createDepartamento(dto: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/departamentos`, dto)
      .pipe(map((response: any) => response));
  }

  // Crear un nuevo municipio
  createMunicipio(dto: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/municipios`, dto)
      .pipe(map((response: any) => response));
  }

  // Actualizar un país
  updatePais(idPais: number, dto: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/paises/${idPais}`, dto)
      .pipe(map((response: any) => response));
  }

  // Actualizar un departamento
  updateDepartamento(idDepartamento: number, dto: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/departamentos/${idDepartamento}`, dto)
      .pipe(map((response: any) => response));
  }

  // Actualizar un municipio
  updateMunicipio(idMunicipio: number, dto: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/municipios/${idMunicipio}`, dto)
      .pipe(map((response: any) => response));
  }

  // Eliminar un país
  deletePais(idPais: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/paises/${idPais}`)
      .pipe(map((response: any) => response));
  }

  // Eliminar un departamento
  deleteDepartamento(idDepartamento: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/departamentos/${idDepartamento}`)
      .pipe(map((response: any) => response));
  }

  // Eliminar un municipio
  deleteMunicipio(idMunicipio: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/municipios/${idMunicipio}`)
      .pipe(map((response: any) => response));
  }
  getUbicacionCompleta(id: number): Observable<string> {
    return this.http.get<any>(`${this.apiUrl}/completa/${id}`).pipe(
      map((response: any) => {
        const ubicacionCompleta = `${response.pais}, ${response.departamento}, ${response.municipio}`;
        return ubicacionCompleta;
      })
    );
  }
}
