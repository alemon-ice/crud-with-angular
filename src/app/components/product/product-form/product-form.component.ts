import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  formAction: 'CREATE' | 'UPDATE' = 'CREATE';
  formTitle: string = 'Novo Produto';
  product: Product = {
    name: '',
    price: 0.0,
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const hasIdParam = this.route.snapshot.paramMap.has('id');

    if (hasIdParam) {
      this.formAction = 'UPDATE';
      this.formTitle = 'Editar Produto';

      const productId = String(this.route.snapshot.paramMap.get('id'));
      this.productService.readById(productId).subscribe((product) => {
        this.product = product;
      });
    }
  }

  createProduct() {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado com sucesso');
      this.router.navigate(['/products']);
    });
  }

  updateProduct() {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto editado com sucesso');
      this.router.navigate(['/products']);
    });
  }

  onSubmit() {
    if (this.formAction === 'CREATE') {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}
