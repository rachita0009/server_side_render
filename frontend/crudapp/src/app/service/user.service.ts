import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Userdata } from '../model/Userdata';
 import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Data, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 

  constructor(private http: HttpClient, private router : Router) { }

 

  register(data: Userdata):Observable<any>{
    let Firstname =  data.firstName;
    let Lastname =  data.lastName;
   let {gender,mobile,password,email} = data;
  return this.http.post(environment.baseurl +'/create',{
   Firstname,Lastname,gender,mobile,password,email
  })
}

login(data:Userdata):Observable<any>{
  let {email,password} = data;

  return this.http.post(environment.baseurl+'/login',{
    email, password
  },)
}



logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/login'])
}

createAuthrorizationHeader(): HttpHeaders {

  const token = localStorage.getItem('token');
  let headers = new HttpHeaders({ 'xtoken': `${token}` });
  return headers
}

getuser():Observable<any>{
  let headers = this.createAuthrorizationHeader();
  console.log(headers);
  return this.http.get(environment.baseurl+ '/user', {headers})

}


existemail(email: string):Observable<any> {
return this.http.post(environment.baseurl +'/checkemail', email)

}


getalluser():Observable<any>{
  return this.http.get(environment.baseurl + '/fetchdata')

}

}

  // getuser():Observable<any>{
  //   // let headers = {
  //   //   'xtoken': 'bearer' + localStorage.getItem('token')
  //   // }
  //   const token = localStorage.getItem('access_token');
  //   const headers = new Headers('access_token', token);

    


  //   return this.http.get(environment.baseurl+  '/user', {headers})
  // }

