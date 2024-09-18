import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditProductComponent } from './add-edit-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [
    AddEditProductComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
  ]

})
export class AddEditProductModule { }
