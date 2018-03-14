import { Component, OnInit, Inject} from '@angular/core';
import { ApiService, Login, Creds } from '../api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgxPermissionsService } from 'ngx-permissions';
import {
    DynamicCheckboxModel,
    DynamicDatePickerModel,
    DynamicFormGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
    DynamicSwitchModel,
    DynamicTextAreaModel
} from "@ng-dynamic-forms/core";

import { FormGroup } from "@angular/forms";

import { DynamicFormService, DynamicFormControlModel, DynamicFormLayout } from "@ng-dynamic-forms/core";



@Component({
  selector: 'app-login',
  template: `

<span  *ngIf=login >
<mat-menu #userMenu="matMenu">
 <a mat-menu-item routerLink="/login/list">
  <mat-icon>account_circle</mat-icon>{{login.name}}</a>
  <p mat-menu-item  *ngxPermissionsOnly="['payment.read']"><mat-icon>account_balance_wallet</mat-icon>{{login.account}}</p>
<button mat-menu-item (click)="logout()" >
  <mat-icon>exit_to_app</mat-icon> <ng-container i18n>Выйти</ng-container> {{login.login}}
</button>
</mat-menu>


<button  mat-button [matMenuTriggerFor]="userMenu">
  <mat-icon>person</mat-icon> {{login.name}}
</button>
</span>

<button mat-button  *ngIf=!login (click)="openLoginPopup()">
  <mat-icon>exit_to_app</mat-icon> Войти
</button>
  `,
  styles: []
})
export class LoginComponent implements OnInit {
  login: Login ;

  constructor( private api: ApiService, private dialog: MatDialog, private permissionsService: NgxPermissionsService) { }


  logout(){
    this.api.auth_logout().subscribe(data => {this.login = undefined; } );
    this.permissionsService.loadPermissions([]);
  }

  openLoginPopup() {
    let dialogRef = this.dialog.open(LoginPopup, {
      width: '228px',
      data: {}
    });
   dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.login = { ...data };
        this.permissionsService.loadPermissions(data.permission);
      }
    });
  }

  ngOnInit() {
    this.api.auth_refresh().subscribe(data => {
      this.login = { ...data };
      this.permissionsService.loadPermissions(data.permission);
    } );
  }

}


export const LOGIN_MODEL: DynamicFormControlModel[] = [

    new DynamicInputModel({
        id: "login",
        placeholder: "Логин",
        validators: { required: null },
        errorMessages: {
            required: "{{ placeholder }} is required."
        }
    }),
    new DynamicInputModel({
        id: "password",
        placeholder: "Пароль",
        inputType: "password"
    })
]

@Component({
  selector: 'login-popup',
  template: `
<form action=# [formGroup]="formGroup" (submit)=submit() >
  <div mat-dialog-title i18n>Вход</div>
  <div mat-dialog-content>

    <dynamic-material-form [group]="formGroup"
                           [model]="LoginFormModel"></dynamic-material-form>

    </div>
    <div mat-dialog-actions>
    <button type=submit mat-raised-button color="primary" >Войти</button>
    </div>
</form>
`})
export class LoginPopup implements OnInit {

    LoginFormModel: DynamicFormControlModel[] = LOGIN_MODEL;
    formGroup: FormGroup;


  constructor(
    private formService: DynamicFormService,
    private api: ApiService,
    public dialogRef: MatDialogRef<LoginPopup>,
    @Inject(MAT_DIALOG_DATA) public data: Creds
  ) { }



  ngOnInit() {
     this.formGroup = this.formService.createFormGroup(this.LoginFormModel);
  }


  submit() {
    this.api.auth_login(this.formGroup.value).subscribe(data => this.dialogRef.close(data), err => console.log(err))
  }

}
