import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Tarea_Interface } from 'src/app/models/tareas.models';
import { TareasService } from 'src/app/services/tareas.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.sass']
})
export class TareasComponent implements OnChanges{
  @Input() tareas: Tarea_Interface[] = [];
  @Output() refresh = new EventEmitter<any>();

  displayedColumns: string[] = ['nombre', 'colaborador', 'prioridad', 'estado', 'acciones'];
  constructor(private service: TareasService, private toastrService: ToastrService){

  }
  
  ngOnChanges(): void {

  }

  editar(info: Tarea_Interface): void{
    this.service.setTarea(info);
  }

  delete(tareaId: number): void{
    this.service.deleteTarea(tareaId).subscribe({
      next: (res: any) => {
        this.toastrService.success('Datos eliminados correctamente.');
        this.refresh.emit(true);
      },
      error: (e: HttpErrorResponse) => {
        this.toastrService.error('Error al eliminar los datos, intente de nuevo.');
      }
    })
  }


}
