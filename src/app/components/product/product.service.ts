import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiURL = `${environment.apiURL}/products`;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false) {
    this.snackBar.open(msg, undefined, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: isError ? 'msg-error' : 'msg-success',
    });
  }

  errorHandler(err: any, message = 'Ocorreu um erro'): Observable<any> {
    this.showMessage(message, true);

    return EMPTY;
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiURL, product).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandler(err, 'Erro ao criar produto'))
    );
  }

  readAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandler(err, 'Erro ao listar produtos'))
    );
  }

  readById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURL}/${id}`).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandler(err, 'Erro ao buscar produto'))
    );
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiURL}/${product.id}`, product).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandler(err, 'Erro ao atualizar produto'))
    );
  }

  delete(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiURL}/${id}`).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandler(err, 'Erro ao excluir produto'))
    );
  }
}
