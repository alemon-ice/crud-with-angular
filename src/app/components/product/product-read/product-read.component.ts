import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../template/dialog/dialog.component';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css'],
})
export class ProductReadComponent implements OnInit {
  products: Product[] = [];

  displayedColumns = ['id', 'name', 'price', 'actions'];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.productService.readAll().subscribe((products) => {
      this.products = products;
    });
  }

  confirmDelete(product: Product) {
    this.dialog.open(DialogComponent, {
      data: {
        title: `Excluir produto`,
        message: `Deseja escluir o produto ${product.name}?`,
        onConfirm: () => {
          this.productService.delete(String(product.id)).subscribe(() => {
            this.productService.showMessage('Produto excluído com sucesso');
            this.fetchData();
          });
        },
      },
    });
  }
}
