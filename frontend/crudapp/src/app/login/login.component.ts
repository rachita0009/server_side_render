import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  submitted = false ;

  constructor(private fb: FormBuilder, private userservice : UserService , private router : Router) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(80),
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]]
      ,
      password: ['', [Validators.required, Validators.maxLength(10)]]
    })
  }

  logindata(){
    
  // const data = this.loginForm.value;
  // this.userservice.login(data).subscribe

  this.submitted = true;
   const data = this.loginForm.value;
 
   this.userservice.login(data).subscribe(
  res=>{
    if(res.sucess){
      // localStorage.setItem('token',data.token)
      // alert('login succefull')
      localStorage.setItem('token',res.token)
      this.router.navigate(['/dashboard']);
    }

   else{
    alert(res.message)
   }
  },
  
    
   )
 
  }
}
