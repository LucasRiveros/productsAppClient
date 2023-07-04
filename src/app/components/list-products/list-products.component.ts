import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {
  products: Product[] = [];
  loading = true;
  constructor(
    private _productService: ProductService,
    private toastr: ToastrService
  ) { }

  public getProducts(): void {
    this._productService.getProducts().pipe(take(1)).subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      }, error: err => {
        console.log(err)
        this.loading = false;
      }
    });
  }

  public deleteProduct(id: any): void {
    this._productService.deleteProduct(id).pipe(take(1)).subscribe({
      next: (data) => {
        this.toastr.success('The product has been removed', 'Product deleted');
        this.getProducts();
      },
      error: err => {
        console.log(err)
        ;
      }
    });
  }
  // public deleteProduct(id: any): void {
  //   this._productService.deleteProduct(id).pipe(take(1)).subscribe(products => {
  //     this.toastr.success('The product has been removed', 'Product deleted');
  //     this.getProducts();
  //   }, err => console.log(err));
  // }

  ngOnInit() {
    this.getProducts();
    const myModal = document.getElementById('myModal')
    const myInput = document.getElementById('myInput')

    myModal?.addEventListener('shown.bs.modal', function () {
      myInput?.focus()
    })
  }
}
