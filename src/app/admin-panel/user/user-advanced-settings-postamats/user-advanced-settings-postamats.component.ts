import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PickUpPointAccessDto} from '../../../common/model/pick-up-point.model';

@Component({
  selector: 'app-user-advanced-settings-postamats',
  templateUrl: './user-advanced-settings-postamats.component.html',
  styleUrls: ['./user-advanced-settings-postamats.component.scss']
})
export class UserAdvancedSettingsPostamatsComponent implements OnInit {

  postamats: PickUpPointAccessDto[] = [];

  constructor(public advancedSettingsPostamatsModalWindow: MatDialogRef<UserAdvancedSettingsPostamatsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Array<PickUpPointAccessDto>) { }

  ngOnInit() {
    this.postamats = this.data;
  }

  onNoClick(): void {
    this.advancedSettingsPostamatsModalWindow.close();
  }

}
