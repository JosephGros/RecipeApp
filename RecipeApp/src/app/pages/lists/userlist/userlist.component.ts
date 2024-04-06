import { Component } from '@angular/core';
import { UserListService } from '../../../services/user-list.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Getlists } from '../../../interfaces/getlists';
import { Listcontent } from '../../../interfaces/listcontent';
import { RecipeIdFormatterPipe } from '../../../pipe/recipe-id-formatter.pipe';
import { DatePipe } from '@angular/common';
import { BackBtnService } from '../../../services/back-btn.service';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent {

  title: any;
  listId: any;

  loading = false;
  error = '';

  content?: Listcontent[];

  constructor(private lists: UserListService, private route: ActivatedRoute, private back: BackBtnService){}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.title = params['title'];
      this.listId = params['listId'];
    });

    if(this.listId){
      this.getAllContent();
    } else {
      console.error('List ID not found.');
    }
  }

  getAllContent(){
    this.loading = true;
    this.lists.showList(this.listId).subscribe({
      next: (result: Listcontent[]) => {
        console.log(result);
        let content: Listcontent[] = [];
        content = result.map((item: Listcontent) => {
          return {
            id: item.id,
            userlists_id: item.userlists_id,
            recipeId: item.recipeId,
            recipeLabel: item.recipeLabel,
            recipeIngredientLines: item.recipeIngredientLines,
            recipeTotalTime: item.recipeTotalTime, 
            recipeHealthLabels: item.recipeHealthLabels,
            recipeco2Emissions: item.recipeco2Emissions,
            created_at: item.created_at
          }
        });
        this.content = content;
        this.loading = false;
        console.log(content);
      },
      error: (error: any) => {
        this.loading = false;
        this.error = "There are no recipes in your list.";
        console.log(error);
      }
    })
  }

  recipeRemove(id: string, recipeId: string){
    this.lists.removeRecipe(id, recipeId).subscribe({
      next: (response) => {
        console.log('Recipe removed: ', response);
      },
      error: (error) => {
        console.error('Error removing recipe: ', error);
      }
    })
    this.back.reload();
  }

  backBtn() {
    this.back.backFn();
  }

}
