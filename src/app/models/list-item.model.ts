export class ListItem {
  desc:string;
  completed:boolean;
  constructor(desc:string){
    this.desc = desc;
    this.completed = false;
  }
}