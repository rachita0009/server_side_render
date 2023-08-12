import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  users!: any[];
  constructor(private http: HttpClient) { }

  getalluser( sort = 'asc',
  page = 0, Size = 3):Observable<any>{
    
    return this.http.get(environment.baseurl + '/fetchdata', {
      params: new HttpParams()
          // .set('filter', filter)
          .set('sortOrder', sort)
          .set('pageNumber', page.toString())
          .set('pageSize', Size.toString())
  }).pipe(
      // map(res =>  res["payload"])
  )
  
  }

  getdatas(
    offset:any, limit :any,search = '', orderby = 'asc',
     sort ='Firstname' ):Observable<any>  {
  
   return this.http.get(environment.baseurl +'/userss', {
        params: new HttpParams()
            .set('offset', offset.toString())
            .set('limit', limit.toString())
            .set('search', search)
            .set('orderby', orderby.toString())
            .set('sort', sort.toString())
    }).pipe(  
      map((response: any) =>  response )
  )
  }

  getdatas1(
    offset:any, limit :any,search = '',gender='', orderby = 'asc',
     sort ='Firstname' ):Observable<any>  {
  
   return this.http.get(environment.baseurl +'/userss1', {
        params: new HttpParams()
            .set('offset', offset.toString())
            .set('limit', limit.toString())
            .set('search', search)
            .set('gender', gender)
            .set('orderby', orderby.toString())
            .set('sort', sort.toString())
    }).pipe(  
      map((response: any) =>  response )
  )
  }
}
