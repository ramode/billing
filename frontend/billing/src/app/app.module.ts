import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { LoginComponent, LoginPopup} from './login/login.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPermissionsModule } from 'ngx-permissions';
import { LoginEditComponent, LoginListComponent } from './login-edit/login-edit.component';

import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicFormsMaterialUIModule } from "@ng-dynamic-forms/ui-material";


//import { registerLocaleData } from '@angular/common';
//import localeRu from '@angular/common/locales/ru';
//import localeRuExtra from '@angular/common/locales/extra/ru';
//registerLocaleData(localeRu, 'ru-RU', localeRuExtra);



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, LoginPopup, LoginEditComponent, LoginListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, FlexLayoutModule,
    BrowserAnimationsModule, MatButtonModule, MatCheckboxModule, MatInputModule,
    MatMenuModule, MatIconModule,MatListModule,MatToolbarModule,MatDialogModule,MatCardModule,
    NgxPermissionsModule.forRoot(),
        ReactiveFormsModule,
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsMaterialUIModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],

  entryComponents:[LoginPopup]
})
export class AppModule { }
