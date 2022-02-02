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
  apiURL = `${environment.apiURL}/products`;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string) {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiURL, product);
  }

  readAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL);
  }

  readById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURL}/${id}`);
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiURL}/${product.id}`, product);
  }

  delete(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiURL}/${id}`);
  }
}
