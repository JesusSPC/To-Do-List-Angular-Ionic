import { Component, OnInit } from '@angular/core';
import { ToDoService } from 'src/app/services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { ListItem } from 'src/app/models/list-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  list:List;
  itemName:string = '';

  constructor( private toDoService:ToDoService,
               private route:ActivatedRoute ) { 
    const listaId = this.route.snapshot.paramMap.get('listId');
    
    this.list = this.toDoService.getList(listaId);
  }

  ngOnInit() {
  }

  addItem() {
    if (this.itemName.length === 0) return;
    const newItem = new ListItem(this.itemName);
    this.list.items.push(newItem);

    this.itemName = '';
    this.toDoService.saveStorage();
  }

  changeCheck(item:ListItem){
    const pending = this.list.items
      .filter(item => !item.completed)
      .length;

      if (pending === 0){
        this.list.finishedIn = new Date();
        this.list.finished = true;
      } else {
        this.list.finishedIn = null;
        this.list.finished = false;
      }

    this.toDoService.saveStorage();
  }

  delete(i:number){
    this.list.items.splice(i, 1);
    this.toDoService.saveStorage();
  }

}
