import { Injectable, SkipSelf } from "@angular/core";
import { List } from "../models/list.model";
import { getLocaleFirstDayOfWeek } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class ToDoService {
  listas: List[] = [];

  constructor() {
    this.loadStorage()
  }

  createList(titulo: string) {
    const newList = new List(titulo);
    this.listas.push(newList);
    this.saveStorage();

    return newList.id;
  }

  deleteList(list:List){
    this.listas = this.listas.filter(listData => listData.id !== list.id)
    this.saveStorage();
  }

  getList(id:string | number) {
    id = Number(id);
    return this.listas.find( listaData => listaData.id === id)
  }

  saveStorage() {
    localStorage.setItem("data", JSON.stringify(this.listas));
  }

  loadStorage() {
    if (localStorage.getItem("data")) {
      this.listas = JSON.parse(localStorage.getItem("data"));
    } else {
      this.listas = [];
    }
  }


}
