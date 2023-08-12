import { HttpClient, HttpParams } from '@angular/common/http';

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { fromEvent, merge, tap } from 'rxjs';

import { UserService } from '../service/user.service';
import { UserDataSource } from './datasource';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements AfterViewInit, OnInit {

  dataSource!: UserDataSource;
  total: any
  displayedColumns = ['Firstname', 'email', 'mobile', 'gender'];
  gender:any
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort
  sortValue: any;
  @ViewChild('input')
  input!: ElementRef;
  
  constructor(private http: HttpClient, private userservice: UserService
  ) {

  }
  ngOnInit() {
    this.dataSource = new UserDataSource(this.userservice);
    this.dataSource.eventCallback$.subscribe(data => {
      this.total = data;

    });
    this.dataSource.loaduser1(0, 5, '', '', 'asc', 'Firstname');
  
  }


  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup',)
      .pipe(
         tap(() => {
          this.paginator.pageIndex = 0;
          this.loaduserPage1();
        })
      )
      .subscribe();
    fromEvent(this.input.nativeElement, 'onChange',)
      .pipe(
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loaduserPage1();
        })
      )
      .subscribe();
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // this.paginator.page.subscribe(page=>{this.pageChanged(page)})

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page).pipe(tap(() => this.loaduserPage1())).subscribe();
  }

  someMethod(search:any){
    this.loaduserPage1();
  }
  loaduserPage1() {
    this.dataSource.loaduser1(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.input.nativeElement.value,
      this.gender,
      this.sort.direction,
      this.sort.active
    );
  }
}
