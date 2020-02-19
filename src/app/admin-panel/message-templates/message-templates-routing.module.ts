import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MessageTemplatesListComponent} from './message-templates-list/message-templates-list.component';

const sitePanelRoutes: Routes = [
  {
    path: '',
    component: MessageTemplatesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(sitePanelRoutes)],
  exports: [RouterModule]
})
export class MessageTemplatesRoutingModule {
}
