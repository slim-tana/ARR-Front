import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TechnologieRoutingModule } from './technologie-routing.module';
import { TechnologieComponent } from './technologie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './TechnologieController/add/add.component';
import { GetComponent } from './TechnologieController/get/get.component';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    TechnologieComponent,
    AddComponent,
    GetComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    TechnologieRoutingModule,
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
export class TechnologieModule { }
