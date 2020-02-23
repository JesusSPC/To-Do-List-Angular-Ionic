import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../models/list.model';

@Pipe({
  name: 'completedFilter',
  pure: false
})
export class CompletedFilterPipe implements PipeTransform {

  transform(listas:List[], completed:boolean = true): List[] {
    return listas.filter(lista => lista.finished === completed)
  }

}
