import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ToDoService } from 'src/app/services/todo.service';
import { List } from 'src/app/models/list.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  
  @ViewChild( IonList, {} ) list:IonList;
  @Input() finished = true;

  constructor( public toDoService:ToDoService,
               private router:Router,
               private alertCtrl:AlertController ) { 

  }

  ngOnInit() {}

  selectedList(list:List){

    if (this.finished) this.router.navigateByUrl(`/tabs/tab2/add/${list.id}`);
    else this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);
  }

  deleteList(list:List){
    this.toDoService.deleteList(list);
  }

  async editList(list:List){
      const alert = await this.alertCtrl.create({
        header: "Editar lista",
        inputs: [
          {
            name: "title",
            type: "text",
            value: list.title,
            placeholder: "Nombre de la lista"
          }
        ],
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("Cancelar");
              this.list.closeSlidingItems();
            }
          },
          {
            text: "Editar",
            handler: data => {
              console.log(data);
              if (data.title.length === 0) return;
              list.title = data.title;
              this.toDoService.saveStorage();
              this.list.closeSlidingItems();
            }
          }
        ]
      });
  
      alert.present();
    }
  
}
