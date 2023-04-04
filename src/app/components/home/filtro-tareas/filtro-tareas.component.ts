import { HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Campos_Interface } from 'src/app/models/tareas.models';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-filtro-tareas',
  templateUrl: './filtro-tareas.component.html',
  styleUrls: ['./filtro-tareas.component.sass']
})
export class FiltroTareasComponent implements OnChanges{
  @Input() prioridades: Campos_Interface[] = [];
  @Input() estados: Campos_Interface[] = [];
  @Input() colaboradores: Campos_Interface[] = [];

  todos: boolean = false;

  form: FormGroup = new FormGroup({
    fechainicio: new FormControl(''),
    fechafin: new FormControl(''),
    colaborador: new FormControl(''),
    estado: new FormControl(''),
    prioridad: new FormControl(''),
  });

  constructor(private service: TareasService){

  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  onToggle(): void{
    if(this.todos)
      this.service.setFiltro({todos: true});
  }

  getParams(): HttpParams{
    let params: HttpParams = new HttpParams();

    const fechaInicio = this.getFormValue('fechainicio') ;
    const fechaFin = this.getFormValue('fechafin') ;
    const colaborador = this.getFormValue('colaborador') ;
    const estado = this.getFormValue('estado') ;
    const prioridad = this.getFormValue('prioridad') ;

    if(fechaInicio != null && fechaInicio != '')
      params = params.append('fechaInicio', new Date(fechaInicio).toISOString())

      
      if(fechaFin != null && fechaFin != '')
      params = params.append('fechaFin', new Date(fechaFin).toISOString())

    
      if(colaborador != null && colaborador != '')
      params = params.append('colaborador', colaborador)

          
      if(estado != null && estado != '')
      params = params.append('estado', estado)

        
      if(prioridad != null && prioridad != '')
      params = params.append('prioridad', prioridad)


    return params;
  }

  getFormValue(value: string): any{
    return this.form.get(value)?.value;
  }

  buscar(): void{
    this.service.setFiltro({params: this.getParams(), todos: false});
  }
  
  limpiarFiltro(): void{
    this.form.reset();
  }

}
