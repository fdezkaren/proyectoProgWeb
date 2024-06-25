import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaLaboralService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1Experiencia/';

  constructor(private http: HttpClient) {}

  getExperiencia(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  getExperiencias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  agregarExperiencia(experiencia: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, experiencia);
  }

  actualizarExperiencia(experiencia: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, experiencia);
  }

  eliminarExperiencia(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}
