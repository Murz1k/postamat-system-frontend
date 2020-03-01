import {getLocaleFirstDayOfWeek} from '@angular/common';
import {NativeDateAdapter} from '@angular/material';
import {Injectable} from '@angular/core';

@Injectable()
export class LocaleDateAdapter extends NativeDateAdapter {
    getFirstDayOfWeek() {
        return getLocaleFirstDayOfWeek('ru-RU');
        // return getLocaleFirstDayOfWeek(this.locale);
    }
}
