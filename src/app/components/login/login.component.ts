import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login_Interface } from 'src/app/models/login.models';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(private loginService: LoginService, private toastrService: ToastrService, private router: Router){
  }
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void{

  }

  login(): void{
    this.loginService.login(this.getLoginInfo()).subscribe(
      {
      next: (res: any) => {
        this.router.navigate(['home']);
      },
      error: (e: HttpErrorResponse) => {
        this.toastrService.error('Error al iniciar sesion, verifique los datos.');
      }
    }
    );
  }

  getLoginInfo(): Login_Interface{
    return {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    }
  }
}
