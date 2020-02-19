import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PickUpPoint} from '../../../common/model/pick-up-point.model';
import {MaterialService} from '../../../common/material.service';

@Component({
  selector: 'app-update-pick-up-point',
  templateUrl: './update-pick-up-point.component.html',
  styleUrls: ['./update-pick-up-point.component.scss']
})
export class UpdatePickUpPointComponent implements AfterViewInit {

  constructor(public updatePickUpPointModalWindow: MatDialogRef<UpdatePickUpPointComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PickUpPoint) { }

  ngAfterViewInit() {
    setTimeout(() => {
      MaterialService.updateTextInputs();
    }, 100);
  }

  onNoClick(): void {
    this.updatePickUpPointModalWindow.close();
  }

}
