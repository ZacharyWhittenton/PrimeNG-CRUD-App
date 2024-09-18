import { Component, EventEmitter, Input, Output  } from '@angular/core';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent {

    @Input() displayAddModal: boolean =  true;
    @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit(): void {

    }

    closeModal() {
      this.clickClose.emit(true);
    }

   
}
