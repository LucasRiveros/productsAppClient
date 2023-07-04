import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:4000/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.url);
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(this.url, product);
  }

  updateProduct(id: string, product: Product): Observable<any> {
    return this.http.put(`${this.url}/${id}`, product);
  }
}
