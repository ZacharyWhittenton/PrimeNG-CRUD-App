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
  @Output() clickAddEdit: EventEmitter<Product> = new EventEmitter<Product>();
  modalType = "Add";

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
  
  ngOnInit(): void {
    console.log('Add/Edit Product Component initialized');
  }
  ngOnChanges(): void {
      if (this.selectedProduct) {
        this.modalType = 'Edit';
        this.productForm.patchValue(this.selectedProduct);
      } else {
        this.productForm.reset();
        this.modalType = 'Add';
      }
  }

  closeModal() {
    this.productForm.reset();
    this.clickClose.emit(true);
  }

  addEditProduct() {
    // Validate the form before proceeding
    if (this.productForm.invalid) {
        this.messageService.add({ 
            severity: 'error', 
            summary: 'Invalid Form', 
            detail: 'Please fill in all required fields.' 
        });
        return;
    }

    this.productService.addEditProduct(this.productForm.value, this.selectedProduct).subscribe(
        response => {
            console.log('Product response:', response); // Log the response for debugging
            this.clickAddEdit.emit(response);
            this.closeModal();
            const msg = this.modalType === 'Add' ? 'Product added' : 'Product updated';
            this.messageService.add({ 
                severity: 'success', 
                summary: 'Success', 
                detail: msg 
            });
        },
        error => {
            const errorMsg = error.message || error; // Handle error structure
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Error', 
                detail: errorMsg 
            });
            console.log('Error adding product:', error);
        }
    );
}

}
