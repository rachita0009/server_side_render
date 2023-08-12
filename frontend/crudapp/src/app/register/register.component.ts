import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { Userdata } from '../model/Userdata';
import { Router } from '@angular/router';
import { identifierName } from '@angular/compiler';
import { Observable, switchMap } from 'rxjs';
 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
[x: string]: any;
 
   model!: Userdata ; 
  registerForm! : FormGroup;
  submitted! :Boolean ;
  // msg!: any
servererror! :object;
  
  
  
  

  constructor( private fb: FormBuilder, private http: HttpClient, private userservice : UserService ,private router : Router) { }

  ngOnInit(): void {

    this.registerForm= this.fb.group({
      firstName: ['',Validators.required ],
      lastName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(80),
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
      ,
      mobile: ['',[Validators.required,Validators.pattern('^[0-9]*$'),Validators.maxLength(10),,Validators.minLength(10)]],
      gender :['',[Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    
  
    })
  }
  

  // emailExisteValidation(): AsyncValidatorFn{
  //   return (control: AbstractControl): Observable<ValidationErrors | null> =>{
  //     return of(control.value).pipe(
  //       delay(500),
  //       switchMap((email) => this.userservice.existemail(email ||) .pipe(
  //         map((emailExists: any) => emailExists ? { emailExists: true } : null)
  //       ))
  //     );
  //   };
  // }

  onSubmit()
   {
    this.submitted = true;
      this.model = this.registerForm.value;
      
      this.userservice.register(this.model).subscribe(
        result =>{
         
          setTimeout(() => this.submitted = false,
            
         4000);
          console.log(result)
          
          // alert('RESISTRATION  SUCCESSFULL');
      this.router.navigate(['/login']);
      // console.log(this.registerForm.value)
      
      },
      err=>{
        if(err.status===409){
          this.servererror = err.error['error']
        }
        else
        this.servererror =['something went wrong']
      }
      )
      
    
   }
   
    // onSubmit(){
    //   this.submitted = true;
    //   console.log(this.model)
    //  this.userservice.register().subscribe(
    //   result =>{
    //     this.router.navigate(['/dashboard']);
    //     console.log(result)
    //   },
    // error=>{
    //   this.submitted= false
    //   console.log(error)
    // }
      
    //  )
    // }
 
    
  }

