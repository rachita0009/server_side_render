import { Component, OnInit } from '@angular/core';

 import { UserService } from '../service/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 data :any;
 submitted = false ;
  constructor(private userservice : UserService 
    ) { }
  ngOnInit(): void {
    this.getuserprofile();
  }


  getuserprofile(){
   
  this.submitted=true
    this.userservice.getuser().subscribe(
      result=>{
        console.log(result)
        if(result){
          this.data = result.data 
        }
        else{
          console.log('error')
        }
      }
      
    
    )
  }
}
