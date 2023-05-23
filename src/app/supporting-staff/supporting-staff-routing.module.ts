import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NurseComponent } from './nurse/nurse.component';
import { ReceptionistComponent } from './receptionist/receptionist.component';

const routes: Routes = [
  {
    path: 'nurse',
    component: NurseComponent,
  },
  {
    path: 'receptionist',
    component: ReceptionistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportingStaffRoutingModule { }
