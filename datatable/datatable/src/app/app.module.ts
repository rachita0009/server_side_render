import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginationComponent } from './pagination/pagination.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import {MatSortModule} from '@angular/material/sort';

import {MatFormFieldModule} from '@angular/material/form-field';

import {HttpClientModule} from '@angular/common/http';
import { PaginatorComponent } from './paginator/paginator.component';

import { DatatableComponent } from './datatable/datatable.component';
import { Pagination1Component } from './pagination1/pagination1.component';
import { FormsModule } from '@angular/forms';
import { Pagination2Component } from './pagination2/pagination2.component';
import {MatSelectModule} from '@angular/material/select';
import { FilterComponent } from './filter/filter.component';




@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    PaginatorComponent,
  
    DatatableComponent,
    Pagination1Component,
    Pagination2Component,
    FilterComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
