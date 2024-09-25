import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';;

import { ProductComponent } from './product.component';
import { AddEditProductModule } from './add-edit-product/add-edit-product.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    ProductComponent
    // No need to declare AddEditProductComponent here
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    AddEditProductModule, // Import the module
    ReactiveFormsModule,
    ToastModule,
  ],
  exports: [
    ProductComponent
  ],
  providers: [
    MessageService
  ]
})
export class ProductModule { }
