import { Component } from "@angular/core";
import { ToDoService } from "src/app/services/todo.service";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  constructor(
    public toDoService: ToDoService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async addList() {
    const alert = await this.alertCtrl.create({
      header: "Nueva lista",
      inputs: [
        {
          name: "title",
          type: "text",
          placeholder: "Nombre de la lista"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancelar");
          }
        },
        {
          text: "Create",
          handler: data => {
            if (data.title.length === 0) return;
            const listId = this.toDoService.createList(data.title);
            console.log("Lista creada")
            // Crear la lista
            this.router.navigateByUrl(`/tabs/tab1/add/${listId}`);
          }
        }
      ]
    });

    alert.present();
  }
}
