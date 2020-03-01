import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoMaterialModule } from '../common/material-module';
import { MatNativeDateModule } from '@angular/material';

import { SiteRoutingModule } from './site-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AuthService } from '../common/service/auth/auth.service';

import { SiteComponent } from './site.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from '../admin-panel/login/login.component';
import {ZXingScannerModule} from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    SiteComponent,
    HomeComponent,
    LoginComponent,
    Error404Component
  ],
  providers: [
    AuthService
  ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        DemoMaterialModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        SiteRoutingModule,
        NgxSpinnerModule,
        ZXingScannerModule,
    ],
})
export class SiteModule { }
