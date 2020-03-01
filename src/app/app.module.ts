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
import {DateAdapter, MatPaginatorIntl} from '@angular/material';
import {LocaleDateAdapter} from './common/locale-date-adapter';
import {NgZorroAntdModule, NZ_DATE_LOCALE, NZ_I18N, ru_RU} from 'ng-zorro-antd';
import * as ruDateLocale from 'date-fns/locale/ru';
import {MatPaginatorIntlRu} from './common/mat-paginator-intl-ru';

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
    NgZorroAntdModule,
    SiteModule,
    AppRoutingModule
  ],
  providers: [
    {provide: DateAdapter, useClass: LocaleDateAdapter},
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: NZ_I18N, useValue: ru_RU },
    { provide: NZ_DATE_LOCALE, useValue: ruDateLocale },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlRu},
    RestService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
