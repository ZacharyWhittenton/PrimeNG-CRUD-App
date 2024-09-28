import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://fakestoreapi.com/products'; // Base URL for the API

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?sort=desc`);
  }

  addEditProduct(postData: Product, selectedPdt:any){
    if (!selectedPdt) {
      return this.http.post<Product>(this.apiUrl, postData);
    } else {
      return this.http.put<Product>(`${this.apiUrl}/${selectedPdt.id}`, postData); // Use backticks for template literals
    }
  }
}
