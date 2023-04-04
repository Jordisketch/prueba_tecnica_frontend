import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TareasComponent } from './tareas/tareas.component';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/material.module';
import { FormTareasComponent } from './form-tareas/form-tareas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiltroTareasComponent } from './filtro-tareas/filtro-tareas.component';



@NgModule({
  declarations: [
    TareasComponent,
    HomeComponent,
    FormTareasComponent,
    FiltroTareasComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  exports: [
    TareasComponent,
    HomeComponent,
    FiltroTareasComponent
  ],
  providers: [
    DatePipe
  ]
})
export class HomeModule { }
