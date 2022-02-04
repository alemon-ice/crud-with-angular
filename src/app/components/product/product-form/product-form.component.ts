import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
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
    console.log('INICIALIZAÇÃO DO COMPONENTE');

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

  ngOnChanges(changes: SimpleChanges): void {
    console.log('RECEBENDO DADOS ATRAVÉS DO @Input');
    console.log({ changes });
  }

  ngDoCheck(): void {
    console.log('PROPRIEDADES DE ENTRADA VERIFICADAS');
  }

  ngAfterContentInit(): void {
    console.log('CONTEÚDO DO COMPONENTE PROJETADO NA VISUALIZAÇÃO');
  }

  ngAfterContentChecked(): void {
    console.log('ALTERAÇÃO DE CONTEÚDO DO COMPONENTE DETECTADO PELO ANGULAR');
  }

  ngAfterViewInit(): void {
    console.log('VISUALIZAÇÃO DO COMPONENTE TOTALMENTE INICIALIZADA');
  }

  ngAfterViewChecked(): void {
    console.log('VISUALIZAÇÃO DO COMPONENTE VERIFICADA PELO ANGULAR');
  }

  ngOnDestroy(): void {
    console.log('AO FINALIZAR O COMPONENTE');
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
