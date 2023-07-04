import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  productForm: FormGroup;
  title = 'Create Product';
  id: string | null;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.productForm = fb.group({
      product: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required]
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  public createProduct(): void {
    const product: Product = {
      name: this.productForm.get('product')?.value,
      category: this.productForm.get('category')?.value,
      location: this.productForm.get('location')?.value,
      price: this.productForm.get('price')?.value,
    }

    if (this.id) {
      this._productService.updateProduct(this.id, product).pipe(take(1)).subscribe({
        next: (data) => {
          this.toastr.success('The product has been updated successfully', 'Product updated successfully');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this.productForm.reset();
        }
      });
    } else {
      this._productService.createProduct(product).pipe(take(1)).subscribe({
        next: (data) => {
          this.toastr.success('The product has been created and saved successfully', 'Product created successfully');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this.productForm.reset();
        }
      })
    }
  }

  ngOnInit(): void {
    if (this.id) {
      this.loading = true;
      this.title = 'Edit product';
      this._productService.getProduct(this.id).pipe(take(1)).subscribe({
        next: (data) => {
          this.productForm.setValue({
            product: data.name,
            category: data.category,
            location: data.location,
            price: data.price
          });
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        }
      });
    }
  }
}
