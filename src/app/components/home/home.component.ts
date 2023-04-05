import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { Campos_Interface, Filtro_Interface, Tarea_Interface } from 'src/app/models/tareas.models';
import { TareasService } from 'src/app/services/tareas.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit{
  tareas: Tarea_Interface[] = [];
  colaboradores: Campos_Interface[] = [];
  estados: Campos_Interface[] = [];
  prioridades: Campos_Interface[] = [];

  constructor(private service: TareasService, private toastrService: ToastrService){
    this.service.getFiltro().subscribe((res: Filtro_Interface) => {

      if(res.todos)
        this.getTareas();
      
      if(!res.todos && res.params ){
        if(res.params.keys().length > 0){
          this.getTareasFiltro(res.params);
        }else{
          this.toastrService.error('Debe llenar al menos un campo para aplicar el formulario.');
        }
      }

    });
  }

  ngOnInit(): void {
    this.getTareas();
    this.getColaboradores();
    this.getEstados();
    this.getPrioridades();
  }


  getTareas(): void{
    this.service.getTareas().subscribe({
      next: (res: any) => {
          this.tareas = res;
      },
      error: (err: any) => {
        this.toastrService.error('Error al cargar las tareas');
      }
    });
  }
  getTareasFiltro(params: HttpParams): void{
    this.service.getTareasFiltro(params).subscribe({
      next: (res: any) => {
          this.tareas = res;
      },
      error: (err: any) => {
        this.toastrService.error('Error al cargar las tareas');
      }
    });
  }
  getColaboradores(): void{
    this.service.getColaboradores().subscribe({
      next: (res: any) => {
          this.colaboradores = res;
      },
      error: (err: any) => {
        this.toastrService.error('Error al cargar los colaboradores');
      }
    });
  }
  getEstados(): void{
    this.service.getEstados().subscribe({
      next: (res: any) => {
          this.estados = res;
      },
      error: (err: any) => {
        this.toastrService.error('Error al cargar los estados');
      }
    });
  }
  getPrioridades(): void{
    this.service.getPrioridaes().subscribe({
      next: (res: any) => {
          this.prioridades = res;
      },
      error: (err: any) => {
        this.toastrService.error('Error al cargar las prioridades');
      }
    });
  }

  getEvent(event: Event){
    this.getTareas();
  }

}
