import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { fromEvent, merge, tap } from 'rxjs';

import { UserService } from '../service/user.service';
import { UserDataSource } from './datasource';

@Component({
  selector: 'app-pagination1',
  templateUrl: './pagination1.component.html',
  styleUrls: ['./pagination1.component.css']
})
export class Pagination1Component implements AfterViewInit, OnInit {
  // users!: any[];
  // search = ''
  // users!: any
  dataSource!: UserDataSource;
  total: any
  displayedColumns = ['Firstname', 'email', 'mobile', 'gender'];

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
    // this.users = this.route.snapshot.data["users"];
    this.dataSource = new UserDataSource(this.userservice);
    this.dataSource.eventCallback$.subscribe(data => {
      this.total = data;
      
  });
    this.dataSource.loaduser(0, 5, '', 'asc', 'Firstname');
    // this.getData('0', '5');
    // this.sort.sortChange.subscribe((res: any) => {
    //   this.sortValue = res;
    //   console.log(res)})
  }


  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        // debounceTime(150),
        // distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
        //  this.paginator.length=

          this.loaduserPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // this.paginator.page.subscribe(page=>{this.pageChanged(page)})

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page).pipe(tap(() => this.loaduserPage())).subscribe();
  }
  loaduserPage() {
    this.dataSource.loaduser(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.input.nativeElement.value,
      this.sort.direction,
      this.sort.active
    );
  }



  // pageChanged(page: PageEvent) {



  //   let pageIndex = page.pageIndex + 1;
  //   let pageSize = page.pageSize;

  //   let previousIndex = page.previousPageIndex;

  //   let previousSize = pageSize * pageIndex;

  //   this.dataSource.loaduser(previousSize, (pageIndex), pageSize.toString());
  // }


  //   getData(offset: any, limit: any) {
  //     let params = new HttpParams();
  //     params = params.set('offset', offset);
  //     params = params.set('limit', limit);
  //     // params = params.set('search', event.target.value);
  //     params = params.set('sort',this.sortValue.active);
  //     params= params.set('orderby',this.sortValue.direction)

  //     this.http.get('http://localhost:3001/userss?' + params.toString())
  //       .subscribe((response: any) => {
  // console.log(response);


  //         this.users = response.users;
  //         this.users.length = response.total;

  //         this.dataSource = new MatTableDataSource<any>(this.users);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort=this.sort


  //       })
  //   }

  // getNextData(currentSize: any, offset: any, limit: any) {
  //   let params = new HttpParams();
  //   params = params.set('offset', offset);
  //   params = params.set('limit', limit);

  //   this.http.get('http://localhost:3001/userss?' + params.toString())
  //     .subscribe((response: any) => {



  //       this.users.length = currentSize;
  //       this.users.push(...response.users);

  //       this.users.length = response.total;

  //       this.dataSource = new MatTableDataSource<any>(this.users);
  //       this.dataSource._updateChangeSubscription();

  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort=this.sort

  //     })
  // }

  // pageChanged(event: PageEvent) {


  //   let pageIndex = event.pageIndex;
  //   let pageSize = event.pageSize;

  //   let previousIndex = event.previousPageIndex;

  //   let previousSize = pageSize * pageIndex;

  //   this.getNextData(previousSize, (pageIndex).toString(), pageSize.toString());
  // }

  // onSearch(event: any) {
  //   let params = new HttpParams();
  //   params = params.set('search', event.target.value);

  //   this.http.get('http://localhost:3001/userss?' + params.toString())
  //     .subscribe((response: any) => {
  //       // console.log(response);
  //       // console.log(response)


  //       this.users = response.users;
  //       this.users.length = response.total;

  //       this.dataSource = new MatTableDataSource<any>(this.users);
  //       this.dataSource.paginator = this.paginator;
  //       // this.dataSource.sort=this.sort
  //     })
  // }
  // onclick() {
  //   let params = new HttpParams();
  //   params = params.set('sort', this.sortValue.active);
  //   params = params.set('orderby', this.sortValue.active)

  //   this.http.get('http://localhost:3001/userss?' + params.toString())
  //     .subscribe((response: any) => {
  //       console.log(response)


  //       this.users = response.users;
  //       this.users.length = response.total;

  //       this.dataSource = new MatTableDataSource<any>(this.users);
  //       this.dataSource.paginator = this.paginator;
  //     })
  // }



}
