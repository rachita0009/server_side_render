import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  users!: any[]
  // displayedColumns: string[] = [ 'Firstname', 'Email', 'Mobile','Gender'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort

  constructor(private userservice: UserService) { }

  ngOnInit(): void {
    this.getData()
    this.sort.sortChange.subscribe((res: any) => {

      console.log(res)
    })


  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getData() {
    this.userservice.getalluser().subscribe((response: any) => {

      this.users = response.Data;

      this.dataSource = new MatTableDataSource<any>(this.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  

}
