import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ProjetRoutingModule } from './projet-routing.module';
import { ProjetComponent } from './projet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddContComponent } from './ProjetController/add/add.component';
import { GetComponent } from './ProjetController/get/get.component';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ProjetComponent,
    AddContComponent,
    GetComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    ProjetRoutingModule,
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
export class ProjetModule { }
