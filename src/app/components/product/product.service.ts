import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private snackBar: MatSnackBar) {}

  showMessage(msg: string) {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
