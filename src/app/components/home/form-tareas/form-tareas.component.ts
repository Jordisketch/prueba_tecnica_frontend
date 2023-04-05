import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Campos_Interface, Tarea_Interface } from 'src/app/models/tareas.models';
import { TareasService} from 'src/app/services/tareas.service';
import {  ToastrService} from 'src/app/services/toastr.service';

import * as  moment from 'moment';
@Component({
  selector: 'app-form-tareas',
  templateUrl: './form-tareas.component.html',
  styleUrls: ['./form-tareas.component.sass']
})
export class FormTareasComponent implements OnChanges{
  @Input() prioridades: Campos_Interface[] = [];
  @Input() estados: Campos_Interface[] = [];
  @Input() colaboradores: Campos_Interface[] = [];

  @Output() refresh = new EventEmitter<any>();


  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    descripcion: new FormControl('', Validators.required),
    fechainicio: new FormControl('', Validators.required),
    fechafin: new FormControl('', Validators.required),
    notas: new FormControl('', Validators.required),
    colaborador: new FormControl(''),
    estado: new FormControl('', Validators.required),
    prioridad: new FormControl('', Validators.required),
  });


  constructor(private service: TareasService, private toastrService: ToastrService, private datePipe: DatePipe){
    this.service.getTareaObservable().subscribe((res: Tarea_Interface) => {
        this.form.setValue({
          id: res.id,
          descripcion: res.descripcion,
          fechainicio: new Date(res.fechainicio),
          fechafin: new Date(res.fechafin),
          notas: res.notas,
          colaborador:  res.colaborador && res.colaborador.id != null && res.colaborador != null ? res.colaborador.id : '',
          estado: res.estado.id,
          prioridad: res.prioridad.id
        });
    });
  }

  ngOnChanges(): void{
  }

  manageEstado(): void{
    //si es el estado es distinto de pendiente se debe requerir un colaborador
    console.log(this.getFormValue<number>('estado'));
    console.log(this.getFormValue<string>('colaborador'));

    if(this.getFormValue<number>('estado') > 1){
      this.form.controls['colaborador'].setValidators([Validators.required]);
      this.form.controls['colaborador'].updateValueAndValidity();

    }else{
      this.form.controls['colaborador'].clearValidators();
      this.form.controls['colaborador'].updateValueAndValidity();
    }
  }


  getFormValue<T>(value: string): T{
    return this.form.get(value)?.value;
  }


  save(): void{
    this.service.saveTarea(this.getInfo()).subscribe({
      next: (res: any) => {
        this.toastrService.success('Datos guardados correctamente');
        this.refresh.emit(true);
      },
      error: (err) => {
        this.toastrService.error('Error al guardar la tarea, intente de nuevo.');
      },
    });
  }

  getInfo(): Tarea_Interface{
    let info: Tarea_Interface = {
      id:  this.getFormValue<number>('id'),
      prioridad: {
        id:this.getFormValue<number>('prioridad'),
        nombre: this.findPrioridad(this.getFormValue<number>('prioridad')) != undefined ? this.findPrioridad(this.getFormValue<number>('prioridad'))! : ''
      },
      estado: {
        id: this.getFormValue<number>('estado'),
        nombre: this.findEstado(this.getFormValue<number>('estado')) != undefined ? this.findEstado(this.getFormValue<number>('estado'))! : ''
      },
      notas: this.getFormValue<string>('notas'),
      descripcion: this.getFormValue<string>('descripcion'),
      fechafin: new Date(this.getFormValue('fechafin')),
      fechainicio: new Date(this.getFormValue('fechainicio')),
    };

    if(this.getFormValue<string>('colaborador') != '' && this.getFormValue<number>('colaborador') > 0){
      info.colaborador = {
          id: this.getFormValue<number>('colaborador'),
          nombre: this.findColaborador(this.getFormValue<number>('colaborador')) != undefined ? this.findColaborador(this.getFormValue<number>('colaborador'))! : ''
        } ;
    };

    return  info;
  }


  findColaborador(colaboradorId: number){
    return this.colaboradores.find((res: Campos_Interface) => res.id == colaboradorId)?.nombre;
  }
  
  findEstado(estadoId: number){
    return this.estados.find((res: Campos_Interface) => res.id == estadoId)?.nombre;
  }
  
  findPrioridad(prioridadId: number){
    return this.prioridades.find((res: Campos_Interface) => res.id == prioridadId)?.nombre;
  }

  limpiar():void {
    this.form.setValue({
      id: 0,
      descripcion: '',
      fechainicio: '',
      fechafin: '',
      notas: '',
      colaborador: '',
      estado: '',
      prioridad: ''
    });
  }
}
