import { NgModule } from '@angular/core';
import { CompletedFilterPipe } from './completed-filter.pipe';

@NgModule({
  declarations: [CompletedFilterPipe],
  exports: [
    CompletedFilterPipe
  ]
})
export class PipesModule { }
