import { Component, Input, OnChanges, OnInit } from '@angular/core';
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

  displayedColumns: string[] = ['nombre', 'colaborador', 'prioridad', 'estado', 'acciones'];
  constructor(private service: TareasService, private toastrService: ToastrService){

  }
  
  ngOnChanges(): void {

  }

  editar(info: Tarea_Interface): void{
    this.service.setTarea(info);
  }

  delete(tareaId: number): void{
    this.service.deleteTarea(tareaId).subscribe((res: string) => {
      this.toastrService.success(res);
    })
  }


}
