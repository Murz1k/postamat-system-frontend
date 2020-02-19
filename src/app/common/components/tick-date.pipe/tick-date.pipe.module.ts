import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {TickDatePipe} from './tick-date.pipe';

@NgModule({
    declarations: [TickDatePipe],
    imports: [
        CommonModule,
    ],
    providers: [DatePipe],
    exports: [TickDatePipe],
})
export class TickDatePipeModule {
}
