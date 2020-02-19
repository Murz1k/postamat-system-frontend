import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './site.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from '../admin-panel/login/login.component';

const sitePanelRoutes: Routes = [
    {
        path: '',
        component: SiteComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(sitePanelRoutes)],
    exports: [RouterModule]
})
export class SiteRoutingModule { }
