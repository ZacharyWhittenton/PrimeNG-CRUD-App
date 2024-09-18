import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';


import { ProductComponent } from './product.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';




@NgModule({
  declarations: [
    ProductComponent,
    AddEditProductComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    

  ],
  exports: [
    ProductComponent
  ]
})
export class ProductModule { }
