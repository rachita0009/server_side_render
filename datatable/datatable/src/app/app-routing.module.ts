import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilterComponent } from './filter/filter.component';
import { PaginationComponent } from './pagination/pagination.component';
import { Pagination1Component } from './pagination1/pagination1.component';
import { Pagination2Component } from './pagination2/pagination2.component';
import { PaginatorComponent } from './paginator/paginator.component';

const routes: Routes = [
  // {path:'pagination',component:PaginationComponent},
  // {path : 'paginator',component :PaginatorComponent},
  // {path:'data',component:DataComponent},
  // {path:'datatable',component:DataComponent},
  {path:'page1',component:Pagination1Component},
  {path:'page2',component:Pagination2Component},
  {path:'',component:FilterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
