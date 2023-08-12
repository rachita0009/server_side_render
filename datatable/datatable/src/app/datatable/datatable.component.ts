import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  constructor(private http: HttpClient) { }
  users!: any[]
  
  dataSource = new MatTableDataSource<any>();

  currentPage = 0;

  page: number =0;
  pageSize = 10;
  
  pageEvent! : PageEvent;
 
  @ViewChild(MatSort,{static : true}) sort! : MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
  }
  getData(offset:any, limit:any,sort:any,orderby:any){
    let params = new HttpParams();
    params = params.set('offset', offset);
    params = params.set('limit', limit);
    params = params.set('sort',sort);
    params = params.set('orderby',orderby)

    this.http.get('http://localhost:3001/fetchdata?' + params.toString())
    .subscribe((response: any) =>{

      
      this.users = response.users;
      this.users.length = response.total;

      this.dataSource = new MatTableDataSource<any>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }
}
