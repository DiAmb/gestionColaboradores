import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ColaboradoresService {
  private apiUrl = `${environment.API_URL}/colaboradores`;

  constructor(private http: HttpClient) {}

  // Obtener todos los colaboradores
  getAll(): Observable<any[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(map((response: any) => response.body));
  }

  // Obtener un colaborador por ID
  getById(colaboradorId: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/${colaboradorId}`)
      .pipe(map((response: any) => response.body));
  }

  // Crear un nuevo colaborador
  create(dto: any): Observable<any> {
    return this.http
      .post<any>(this.apiUrl, dto)
      .pipe(map((response: any) => response.body));
  }

  // Actualizar un colaborador existente
  update(colaboradorId: number, dto: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/${colaboradorId}`, dto)
      .pipe(map((response: any) => response.body));
  }

  // Eliminar un colaborador
  delete(colaboradorId: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/${colaboradorId}`)
      .pipe(map((response: any) => response.body));
  }
}
