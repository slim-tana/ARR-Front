import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ControleRoutingModule } from './controle-routing.module';
import { ControleComponent } from './controle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddContComponent } from './ControleController/add/add.component';
import { GetComponent } from './ControleController/get/get.component';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ControleComponent,
    AddContComponent,
    GetComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    ControleRoutingModule,
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
export class ControleModule { }
