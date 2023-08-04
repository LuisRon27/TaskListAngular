import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../Environments/environment';
import { Tarea } from '../Interfaces/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private urlApi: string = environment.apiEndpoint + 'Tareas';

  constructor(private http: HttpClient) { }

  // Método GET para obtener todos
  getAll(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.urlApi);
  }

  // Método GET para obtener por ID
  getById(id: number): Observable<Tarea> {
    const url = `${this.urlApi}/${id}`;
    return this.http.get<Tarea>(url);
  }

  // Método POST para crear
  create(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.urlApi, tarea);
  }

  // Método PUT para actualizar
  update(id: number, tarea: Tarea): Observable<Tarea> {
    const url = `${this.urlApi}/${id}`;
    return this.http.put<Tarea>(url, tarea);
  }

  // Método DELETE para eliminar por ID
  delete(id: number): Observable<any> {
    const url = `${this.urlApi}/${id}`;
    return this.http.delete(url);
  }
}
