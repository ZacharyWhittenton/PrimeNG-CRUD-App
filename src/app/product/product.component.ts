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
  displayAddEditModal = false;
  selectedProduct: Product | null = null; // Specify the type here

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productService.getProducts().subscribe(
      response => {
        this.products = response;
      }
    );
  }

  showAddModal() {
    this.selectedProduct = null;
    this.displayAddEditModal = true;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed; // or simply set to false
  }

  // Accepts a Product type
  saveOrUpdateProduct(newData: Product) {
    console.log('New product added:', newData); // Debugging line
    if (this.selectedProduct && newData.id === this.selectedProduct.id) {
      const productIndex = this.products.findIndex(data => data.id === newData.id);
      if (productIndex !== -1) {
        this.products[productIndex] = newData; // Update existing product
      }
    } else {
      this.products.unshift(newData); // Add the new product to the top of the list
    }

    this.hideAddModal(true); // Optionally close the modal after saving
  }

  showEditModal(product: Product) {
    this.selectedProduct = product;
    this.displayAddEditModal = true;
  }
}
