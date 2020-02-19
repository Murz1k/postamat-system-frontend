import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CellsOperationsAuthorizationDto} from '../../../common/model/user.model';

@Component({
  selector: 'app-user-advanced-cells-settings',
  templateUrl: './user-advanced-cells-settings.component.html',
  styleUrls: ['./user-advanced-cells-settings.component.scss']
})
export class UserAdvancedCellsSettingsComponent implements OnInit {

  constructor(public advancedSettingsModalWindow: MatDialogRef<UserAdvancedCellsSettingsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CellsOperationsAuthorizationDto) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.advancedSettingsModalWindow.close();
  }


}
