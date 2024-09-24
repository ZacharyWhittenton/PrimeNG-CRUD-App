import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent {

  @Input() displayAddModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    // Initialize the form inside the constructor
    this.productForm = this.fb.group({
      title: ["", Validators.required],
      price: [0, Validators.required],
      description: [''],
      category: ["", Validators.required],
      image: ["", Validators.required],
    });
  }

  closeModal() {
    this.clickClose.emit(true);
  }

  addProduct() {
    // Use productForm's value instead of productService's value
    this.productService.saveProduct(this.productForm.value).subscribe(
      response => {
        console.log(response);
        this.productForm.reset();
        this.clickClose.emit(true);
      }
    );
  }
}
