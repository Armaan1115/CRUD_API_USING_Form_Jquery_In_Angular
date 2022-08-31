import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DropdownComponent } from './Cascading_Dropdown/dropdown/dropdown.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {path:"about",component:AboutComponent},
  {path:"privacy",component:PrivacyComponent},
  {path:"student",component:StudentComponent},
  {path:"dropdown",component:DropdownComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
