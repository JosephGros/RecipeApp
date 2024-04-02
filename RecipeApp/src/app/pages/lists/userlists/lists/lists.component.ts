import { Component } from '@angular/core';
import { UserListService } from '../../../../services/user-list.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../interfaces/user';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent {

  constructor(private lists: UserListService, private auth: AuthService){}

  userId: any;
  // user: any;

  ngOnInit(){
    // this.user = this.auth.setUserInfo(this.auth.userInfo)
    // console.log(this.user);
    this.userId = this.auth.userInfo?.id;

    this.lists.allLists(this.userId);

  }
}
