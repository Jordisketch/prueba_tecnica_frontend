import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Campos_Interface, Filtro_Interface, Tarea_Interface } from '../models/tareas.models';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private http: HttpClient) { }

  private tarea: Subject<Tarea_Interface> = new Subject();
  private tarea$ = this.tarea.asObservable();

  private filtro: Subject<Filtro_Interface> = new Subject();
  private filtro$ = this.filtro.asObservable();


  setTarea(info: Tarea_Interface): void{
    this.tarea.next(info);
  }

  getTareaObservable(): Observable<Tarea_Interface>{
    return this.tarea$;
  }

  
  setFiltro(info: Filtro_Interface): void{
    this.filtro.next(info);
  }

  getFiltro(): Observable<Filtro_Interface>{
    return this.filtro$;
  }

  getTareas(): Observable<Tarea_Interface>{
    return this.http.get<Tarea_Interface>('http://localhost:8080/tareas/lista');
  }

  deleteTarea(tareaId: number): Observable<string>{
    return this.http.delete<string>(`http://localhost:8080/tareas/eliminar/${tareaId}`);
  }
  

  getTareasFiltro(params: HttpParams): Observable<Tarea_Interface>{
    return this.http.get<Tarea_Interface>('http://localhost:8080/tareas/busqueda', {params: params});
  }
  
  getColaboradores(): Observable<Campos_Interface>{
    return this.http.get<Campos_Interface>('http://localhost:8080/tareas/colaboradores');
  }
  
  getPrioridaes(): Observable<Campos_Interface>{
    return this.http.get<Campos_Interface>('http://localhost:8080/tareas/prioridades');
  }
  
  getEstados(): Observable<Campos_Interface>{
    return this.http.get<Campos_Interface>('http://localhost:8080/tareas/estados');
  }
  
  saveTarea(info: Tarea_Interface): Observable<string>{
    return this.http.post<string>('http://localhost:8080/tareas/agregar',info );
  }

}
