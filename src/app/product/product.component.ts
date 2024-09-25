import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
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
    });
  }

  showAddModal() {
    this.displayAddModal = true;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddModal = !isClosed; // or simply set to false
  }
  saveProductToList(NewData: Product) {
    console.log('New product added:', NewData); // Debugging line
    this.products.unshift(NewData); // Add the new product to the top of the list
    
}

  
}
