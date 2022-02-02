import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = `${environment.apiURL}/products`;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string) {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }
}
