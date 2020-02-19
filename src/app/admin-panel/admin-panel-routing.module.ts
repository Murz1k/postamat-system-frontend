import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from '../common/service/auth/auth.guard';

import {AdminPanelComponent} from './admin-panel.component';
import {HomeComponent} from './home/home.component';
import {PickUpPointComponent} from './pick-up-point/pick-up-point.component';
import {CellComponent} from './pick-up-point/cell/cell.component';
import {UserComponent} from './user/user.component';
import {CellsComponent} from './cells/cells.component';

const adminPanelRoutes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'pick-up-point',
        component: PickUpPointComponent
      },
      {
        path: 'pick-up-point/:id',
        component: CellComponent
      },
      {
        path: 'cells',
        component: CellsComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'message-templates',
        loadChildren: () => import('./message-templates/message-templates.module').then(mod => mod.MessageTemplatesModule),
      },
      {
        path: 'messages',
        loadChildren: () => import('./messages/messages.module').then(mod => mod.MessagesModule),
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminPanelRoutes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule {
}
