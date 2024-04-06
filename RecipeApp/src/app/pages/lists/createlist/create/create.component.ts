import { Component } from '@angular/core';
import { UserListService } from '../../../../services/user-list.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { Getlists } from '../../../../interfaces/getlists';
import { BackBtnService } from '../../../../services/back-btn.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  createListForm = new FormGroup({
    title: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(25)
      ])
    });

  constructor(private lists: UserListService, private router: Router, private auth: AuthService, private back: BackBtnService){
    this.userId = this.auth.userInfo?.id;
  }

  userId: any;
  listTitle: any;
  loading = false;
  error = '';

  createSubmit() {
    const createData = this.createListForm.value;
    this.listTitle = createData.title;
    this.loading = true;
    this.lists.createList(this.listTitle, this.userId).subscribe({
      next: (result) => {
        console.log('New list created!', result);
        this.loading = false;
        this.router.navigate(['/mylists']);
      },
      error: (error) => {
        console.error('Create list failed: ', error);
        this.loading = false;
        this.error = "Create list failed. Please try again.";
      }
    });
  }

  backBtn(){
    this.back.backFn();
  }

}
