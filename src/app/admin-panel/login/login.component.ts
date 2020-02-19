import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

import {AuthService} from '../../common/service/auth/auth.service';
import {MaterialService} from '../../common/material.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    private sub$: Subscription;

    constructor(private router: Router,
                private auth: AuthService) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required])
        });
    }

    login(): void {
        this.form.disable();
        this.sub$ = this.auth.login(this.form.value)
            .subscribe(
                () => this.router.navigate(['admin']),
                e => {
                    MaterialService.toast(checkError(e));
                    this.form.enable();
                },
                () => this.form.enable());
    }

    ngOnDestroy(): void {
        if (this.sub$) {
            this.sub$.unsubscribe();
        }
    }
}

function checkError(reject): string {
  return (reject.status === 401) ? 'Неверный логин или пароль' : `Ошибка: ${reject.status}`;
}
