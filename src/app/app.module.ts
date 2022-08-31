import { StudentComponent } from './student/student.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './Cascading_Dropdown/dropdown/dropdown.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CheckBoxItemComponent } from './Checkbox/check-box-item/check-box-item.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    AboutComponent,
    PrivacyComponent,
    DropdownComponent,
    CheckBoxItemComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
