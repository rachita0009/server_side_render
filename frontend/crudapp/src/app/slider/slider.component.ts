import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor(private userservice : UserService) { }

  ngOnInit(): void {
  }
  Logout(){
    this.userservice.logout()
  }
}
