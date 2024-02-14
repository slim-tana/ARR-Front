import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SpecificationRoutingModule } from './specification-routing.module';
import { SpecificationComponent } from './specification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSpecComponent } from './SpecificationController/add/add.component';
import { GetComponent } from './SpecificationController/get/get.component';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    SpecificationComponent,
    AddSpecComponent,
    GetComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    SpecificationRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    FormsModule
  ,],
  providers: [
    { provide:MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ]
})
export class SpecificationModule { }
