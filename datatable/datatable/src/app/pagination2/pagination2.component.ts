import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pagination2',
  templateUrl: './pagination2.component.html',
  styleUrls: ['./pagination2.component.css']
})
export class Pagination2Component implements OnInit {
  users!: any[];
  search = ''
  dataSource = new MatTableDataSource<any>();

  

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort
  sortValue: any;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.getData('0', '5');
    this.sort.sortChange.subscribe((res: any) => {
      this.sortValue = res;
      console.log(res)})
  }

  getData(offset: any, limit: any) {
    let params = new HttpParams();
    params = params.set('offset', offset);
    params = params.set('limit', limit);

    this.http.get('http://localhost:3001/userss?' + params.toString())
      .subscribe((response: any) => {
console.log(response);


        this.users = response.users;
        this.users.length = response.total;

        this.dataSource = new MatTableDataSource<any>(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort
        

      })
  }

  getNextData(currentSize: any, offset: any, limit: any) {
    let params = new HttpParams();
    params = params.set('offset', offset);
    params = params.set('limit', limit);

    this.http.get('http://localhost:3001/userss?' + params.toString())
      .subscribe((response: any) => {



        this.users.length = currentSize;
        this.users.push(...response.users);

        this.users.length = response.total;

        this.dataSource = new MatTableDataSource<any>(this.users);
        this.dataSource._updateChangeSubscription();

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort

      })
  }

  pageChanged(event: PageEvent) {


    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;

    let previousIndex = event.previousPageIndex;

    let previousSize = pageSize * pageIndex;

    this.getNextData(previousSize, (pageIndex).toString(), pageSize.toString());
  }

onSearch(event: any){
  let params = new HttpParams();
  params = params.set('search', event.target.value);
  
  this.http.get('http://localhost:3001/userss?' + params.toString())
  .subscribe((response: any) => {
// console.log(response);
    // console.log(response)
    

    this.users = response.users;
    this.users.length = response.total;

    this.dataSource = new MatTableDataSource<any>(this.users);
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort=this.sort
  })
}
onclick(){   
  let params = new HttpParams();
  params = params.set('sort',this.sortValue.active);
  params=params.set('orderby',this.sortValue.direction)
  
  this.http.get('http://localhost:3001/userss?' + params.toString())
  .subscribe((response:any)=>{
    console.log(response)


    this.users = response.users;
    this.users.length = response.total;

    this.dataSource = new MatTableDataSource<any>(this.users);
    this.dataSource.paginator = this.paginator;
  })
}

}
