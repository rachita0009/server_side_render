
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HttpClient, HttpParams } from '@angular/common/http';

import { MatSort } from '@angular/material/sort';
import { UserService } from '../service/user.service';



@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit {

  

  users!: any[]
  
  dataSource = new MatTableDataSource<any>();

  currentPage = 0;

  page: number =0;
  pageSize = 10;
  limit= 50;
  pageEvent! : PageEvent;
  sortByfield:any;
  sortByorder:any;

  title = 'pagination';


  @ViewChild(MatSort,{static : true}) sort! : MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient,private userservice: UserService) {

  }

  ngOnInit() {
    this.getData('0', '5');
    // this.dataSource.sort = this.sort;
   
    // this.dataSource.sort.sortChange.subscribe() 
    this.sort.sortChange.subscribe((res: any)=>{
      
      console.log(res)
    })
  }

  getData(offset:any, limit:any){
    let params = new HttpParams();
    params = params.set('offset', offset);
    params = params.set('limit', limit);

    this.http.get('http://localhost:3001/alluser?' + params.toString())
    .subscribe((response: any) =>{

      
      this.users = response.users;
      this.users.length = response.total;

      this.dataSource = new MatTableDataSource<any>(this.users);
      this.dataSource.paginator = this.paginator;

    })
  }

  getNextData(currentSize: number, offset:any, limit:any){
    let params = new HttpParams();
    params = params.set('offset', offset);
    params = params.set('limit', limit);

    this.http.get('http://localhost:3001/alluser?' + params.toString())
    .subscribe((response: any) =>{

  

      this.users.length = currentSize;
      this.users.push(...response.users);

      this.users.length = response.total;

      this.dataSource = new MatTableDataSource<any>(this.users);
      this.dataSource._updateChangeSubscription();

      this.dataSource.paginator = this.paginator;
  
    })
  }

  pageChanged(event:PageEvent){
    

    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;


    let previousSize = pageSize * pageIndex;

    this.getNextData(previousSize, (pageIndex).toString(), pageSize.toString());
  }


  // pageChanged(event: PageEvent) {
  //   console.log('ggggggggggggggggggggg')
  //   this.page = event.pageIndex;
  //   this.limit = event.length;
    
  // }
}