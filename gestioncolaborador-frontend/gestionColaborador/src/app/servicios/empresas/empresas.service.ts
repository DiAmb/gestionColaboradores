import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  private apiUrl = `${environment.API_URL}/empresas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(map((response: any) => response.body));
  }

  getById(empresaId: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/${empresaId}`)
      .pipe(map((response: any) => response.body));
  }

  create(dto: any): Observable<any> {
    return this.http
      .post<any>(this.apiUrl, dto)
      .pipe(map((response: any) => response.body));
  }

  update(empresaId: number, dto: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/${empresaId}`, dto)
      .pipe(map((response: any) => response.body));
  }

  delete(empresaId: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/${empresaId}`)
      .pipe(map((response: any) => response.body));
  }
}
