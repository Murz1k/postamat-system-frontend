import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { PickUpPoint } from '../../../common/model/pick-up-point.model';

@Component({
  selector: 'app-add-pick-up-point',
  templateUrl: './add-pick-up-point.component.html',
  styleUrls: ['./add-pick-up-point.component.scss']
})
export class AddPickUpPointComponent implements OnInit {

  constructor(
      public addPickUpPointModalWindow: MatDialogRef<AddPickUpPointComponent>,
      @Inject(MAT_DIALOG_DATA) public data: PickUpPoint) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.addPickUpPointModalWindow.close();
  }
}
