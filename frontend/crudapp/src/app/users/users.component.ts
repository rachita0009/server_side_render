import { Component, OnInit, ViewChild } from '@angular/core';

import { UserService } from '../service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['Firstname', 'firstname', 'lastname', 'email', 'reg_date'];
  users: any;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  constructor(private  userservice : UserService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
   this.getusers()

  }

  getusers(){
    this.userservice.getalluser().subscribe(res=>{
      console.log(res)
      if(res){
        this.users = res.Data 
        console.log(this.users);
        
      }
      else{
        console.log('error')
      }

     
    
     this.dataSource = new MatTableDataSource<any>(this.users);
     console.log(this.dataSource);
     
    this.dataSource.paginator = this.paginator;
  
    })
  }
  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    
  }

}
