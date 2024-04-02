import { Component } from '@angular/core';
import { UserListService } from '../../../services/user-list.service';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent {

  constructor(list: UserListService){}

  
}
