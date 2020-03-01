import {Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {BarcodeFormat} from '@zxing/library';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

    availableDevices: MediaDeviceInfo[];
    currentDevice: MediaDeviceInfo = null;

    formatsEnabled: BarcodeFormat[] = [
        BarcodeFormat.CODE_128,
        BarcodeFormat.DATA_MATRIX,
        BarcodeFormat.EAN_13,
        BarcodeFormat.QR_CODE,
    ];

    hasDevices: boolean;
    // hasDevices = true; // Для теста
    hasPermission: boolean;

    // qrResultString = 'Производственный календарь на 2020 год при пятидневной рабочей неделе'; // Для теста
    qrResultString: string;

    torchEnabled = false;
    torchAvailable$ = new BehaviorSubject<boolean>(false);
    tryHarder = false;
    copied: string;

    constructor(
    ) {
    }

    clearResult(): void {
        this.qrResultString = null;
    }

    onCamerasFound(devices: MediaDeviceInfo[]): void {
        this.availableDevices = devices;
        this.hasDevices = Boolean(devices && devices.length);
    }

    onCodeResult(resultString: string) {
        this.qrResultString = resultString;
    }

    onDeviceSelectChange(selected: string) {
        const device = this.availableDevices.find(x => x.deviceId === selected);
        this.currentDevice = device || null;
    }

    onHasPermission(has: boolean) {
        this.hasPermission = has;
    }

    onTorchCompatible(isCompatible: boolean): void {
        this.torchAvailable$.next(isCompatible || false);
    }
}
