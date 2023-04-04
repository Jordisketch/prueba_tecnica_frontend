import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';
import { TareasService } from '../services/tareas.service';
import { MaterialModule } from '../material.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home/home.module';
import { ToastrService } from 'ngx-toastr';
import { FiltroTareasComponent } from './home/filtro-tareas/filtro-tareas.component';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    HomeModule
  ],
  exports: [
    LoginComponent,
  ],
  providers: [
    LoginService,
    TareasService,
  ]
})
export class ComponentsModule { }
