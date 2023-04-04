import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(private _snackBack: MatSnackBar) { }

  error(message: string): void{
    this._snackBack.open(message, 'Cerrar', {
      duration: 5000, 
      panelClass: ['cssnackbar-error'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
  success(message: string): void{
    this._snackBack.open(message, 'Cerrar', {
      duration: 5000, 
      panelClass: ['cssnackbar-info'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
}
