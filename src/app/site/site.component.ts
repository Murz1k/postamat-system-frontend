import {AfterViewInit, Component} from '@angular/core';
import {MaterialService} from '../common/material.service';

@Component({
  selector: 'app-home',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    MaterialService.initAdaptiveMenu();
  }

}
