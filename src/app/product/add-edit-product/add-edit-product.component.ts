import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent {
  @Input() displayAddModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
    if (this.productForm.valid) {
      // Handle the logic for adding the product here
      console.log(this.productForm.value); // Example of what to do with the data

    }
  }
}