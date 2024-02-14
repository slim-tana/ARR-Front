import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './pages/header/header.component';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './modules/nav-bar/nav-bar.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';




@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeaderComponent,
    SideBarComponent,
    NotFoundComponent,
    AppComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    Ng2GoogleChartsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,  
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
   
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr' // 'de' for Germany, 'fr' for France ...
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
