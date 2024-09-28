import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  displayAddEditModal = false;
  selectedProduct: Product | null = null; // Specify the type here
  subscriptions: Subscription[] = [];
  pdtSubscription: Subscription = new Subscription;

  constructor(private productService: ProductService,
      private confirmationService: ConfirmationService,
      private messageService: MessageService,
      
  ) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.pdtSubscription = this.productService.getProducts().subscribe(
      response => {
        this.products = response;
      }
    );
    this.subscriptions.push(this.pdtSubscription)
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

  deleteProduct(product: Product){
 
      this.confirmationService.confirm({
          message: 'Are you sure that you want to delete this product?',
      
          accept: () => { //if they click yes this will happen
            this.productService.deleteProduct(product.id).subscribe(
              Response => {
                //this.getProductList();
                this.products = this.products.filter(data => data.id !== product.id);
                this.messageService.add({ 
                  severity: 'success', 
                  summary: 'Success', 
                  detail: 'Deleted Successfuilly' 
              });
              },
              error => {
                this.messageService.add({ 
                  severity: 'error', 
                  summary: 'Error', 
                  detail: error 
              });
              }
              
            )
          }

      });
  }
  ngOnDestory(): void{
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
