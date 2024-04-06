import { Component } from '@angular/core';
import { UserListService } from '../../../../services/user-list.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../interfaces/user';
import { Route, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BackBtnService } from '../../../../services/back-btn.service';
import { Alluserlists } from '../../../../interfaces/alluserlists';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent {

  constructor(private lists: UserListService, private auth: AuthService, private back: BackBtnService, private router: Router){}

  userId: any;
  listArray?: Alluserlists[];
  loading = false;
  error = '';

  ngOnInit(){
    this.userId = this.auth.userInfo?.id;

    if (this.userId) {
      this.getAllLists();
    } else {
      console.error('User ID not found.');
    }
  }

  getAllLists(){
    this.loading = true;
    this.lists.allLists(this.userId).subscribe({
      next: (result: Alluserlists[]) => {
        console.log(result); 
        let listArray: Alluserlists[] = [];
        listArray = result.map((item: Alluserlists) => {
          return {
            id: item.id,
            title: item.title,
            created_at: item.created_at
          }
        });
        this.listArray = listArray;
        this.loading = false;
        console.log(listArray);
      },
      error: (error: any) => {
        this.error = "There are no lists connected to your account. Create your first list!";
        this.loading = false;
        console.log(error);
      }
    })
  }

  editList(listId: any, listTitle: string){
    this.router.navigate(['/updatelist'], {queryParams: { id: listId, title: listTitle } });
  }

  deleteTheList(listId: any){
    this.lists.deleteList(listId).subscribe({
      next: (result) => {
        console.log('List deleted successfully: ', result);
        this.getAllLists();
      },
      error: (error) => {
        console.log('Error: ', error);
      }
    })
    console.log(listId);
  }
}
