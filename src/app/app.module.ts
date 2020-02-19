import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { SiteModule } from './site/site.module';

import { JwtInterceptor } from './common/service/auth/jwt.interceptor';
import { RestService } from './common/service/rest.service';

import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {DateAdapter} from '@angular/material';
import {LocaleDateAdapter} from './common/locale-date-adapter';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    SiteModule,
    AppRoutingModule
  ],
  providers: [
    {provide: DateAdapter, useClass: LocaleDateAdapter},
    { provide: LOCALE_ID, useValue: 'ru' },
    RestService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
