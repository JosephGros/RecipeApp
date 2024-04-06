import { Component } from '@angular/core';
import { BackBtnService } from '../../../../services/back-btn.service';
import { UserListService } from '../../../../services/user-list.service';
import { ListsComponent } from '../../userlists/lists/lists.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {

  listId: any;
  listTitle: any;
  userId: any;
  loading = false;
  error = '';

  constructor(
    private lists: UserListService,
    private back: BackBtnService, 
    private route: ActivatedRoute, 
    private router: Router,
    private auth: AuthService){
      this.userId = this.auth.userInfo?.id; 
    }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.listId = params['id'];
      this.listTitle = params['title'];
    });
    this.updateListForm.patchValue({
      id: this.listId,
      title: this.listTitle
    })
  }

  updateListForm = new FormGroup({
    title: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(25)
      ]),
    id: new FormControl('')
    });

    updateSubmit() {
      const createData = this.updateListForm.value;
      this.listTitle = createData.title;
      this.listId = createData.id;
      this.loading = true;
      console.log(createData);
      console.log(this.userId);
      this.lists.updateList(this.listTitle, this.listId, this.userId).subscribe({
        next: (result) => {
          console.log('List updated!', result);
          this.loading = false;
          this.router.navigate(['/mylists']);
        },
        error: (error) => {
          console.error('Update list failed: ', error);
          this.loading = false;
          this.error = "Update list failed. Please try again.";
        }
      });
    }

  backBtn(){
    this.back.backFn();
  }
}
