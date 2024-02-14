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
import { AddComponent } from './ProjetController/add/add.component';
import { GetComponent } from './ProjetController/get/get.component';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateComponent } from './ProjetController/update/update.component';
import { DeleteComponent } from './ProjetController/delete/delete.component';
import { GetParentComponent } from './ProjetController/get-parent/get-parent.component';
import { GetChildComponent } from './ProjetController/get-child/get-child.component';
import { GetDetailsComponent } from './ProjetController/get-details/get-details.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendrierComponent } from './ProjetController/calendrier/calendrier.component';
import { StatisticsComponent } from './ProjetController/statistics/statistics.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';





@NgModule({
  declarations: [
    ProjetComponent,
    AddComponent,
    GetComponent,
    UpdateComponent,
    DeleteComponent,
    GetParentComponent,
    GetChildComponent,
    GetDetailsComponent,
    CalendrierComponent,
    StatisticsComponent,

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
    FormsModule ,
    MatExpansionModule ,
    NgxPaginationModule,
    FullCalendarModule,
    Ng2GoogleChartsModule

  ,],
  providers: [
    { provide:MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ]
})
export class ProjetModule { }





