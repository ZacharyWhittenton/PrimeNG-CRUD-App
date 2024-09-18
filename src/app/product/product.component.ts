import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
displayAddModal = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProductList();
  }
  getProductList() {
    this.productService.getProducts().subscribe(
      response => {
        this.products = response;
      }
    )
  }

  showAddModal() {
    this.displayAddModal = true;
  }

}
