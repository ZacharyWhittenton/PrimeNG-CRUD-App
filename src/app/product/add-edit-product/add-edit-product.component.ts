import { Component, EventEmitter, input, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductService } from '../product.service';
import { MessageService } from 'primeng/api';
import { Product } from '../product'; // Make sure this import matches your Product model

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit, OnChanges {

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedProduct: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<Product> = new EventEmitter<Product>();

  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService, 
    private messageService: MessageService) {
    // Initialize the form inside the constructor
    this.productForm = this.fb.group({
      title: ["", Validators.required],
      price: [0, Validators.required],
      description: [''],
      category: ["", Validators.required],
      image: ["", Validators.required],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    console.log('Add/Edit Product Component initialized');
  }
  OnChanges(): void {
      if (this.selectedProduct) {
        this.productForm.patchValue(this.selectedProduct);
      } else {
        this.productForm.reset();
      }
  }

  closeModal() {
    this.productForm.reset();
    this.clickClose.emit(true);
  }

  addProduct() {
    this.productService.saveProduct(this.productForm.value).subscribe(
      response => {
        this.clickAdd.emit(response);
        this.closeModal();
        this.messageService.add({severity: 'sucess', summary: 'Sucess', detail: 'Product added'})
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'error', detail: error})
        console.log('Error adding product:', error); // Handle errors appropriately
      }
    );
  }
}
