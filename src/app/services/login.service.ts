import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { Login_Interface } from '../models/login.models';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(info: Login_Interface){
    console.log(info);
    return this.http.post('http://localhost:8080/login', info , {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {

      const body = response.body;
      const headers = response.headers;

      console.log(headers);

      const bearerToken = headers.get('Authorization');
      console.log('bearer', bearerToken);
      const token: any  = bearerToken?.replace('Bearer ', '');

      localStorage.setItem('token', token);
      console.log(token);

      return body;
    }));
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
