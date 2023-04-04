import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UrlInterceptor } from './helpers/url.interceptor';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule, // <- Added MatNativeDateModule Here
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'} 
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
