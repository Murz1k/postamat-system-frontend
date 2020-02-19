import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
    name: 'tickDate',
})
export class TickDatePipe implements PipeTransform {

    constructor(private datePipe: DatePipe) {
    }

    transform(value: number, format: string): any {
        if (!value) {
            return null;
        }
        return this.datePipe.transform(new Date(value / 1000), format || 'dd/MM/yyyy');
    }
}
