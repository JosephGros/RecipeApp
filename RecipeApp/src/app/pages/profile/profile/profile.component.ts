import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private auth: AuthService) {}

  user: any;

  ngOnInit(){
    this.user = this.auth.setUserInfo(this.auth.userInfo)
    console.log(this.user);
    this.auth.isLoggedIn();
  }

  
}
