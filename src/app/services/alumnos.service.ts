import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private apiUrl = 'http://127.0.0.1:8000/api/v1Alumnos/';

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getAlumno(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  createAlumno(alumno: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, alumno);
  }

  updateAlumno(id: number, alumno: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, alumno);
  }

  deleteAlumno(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}
