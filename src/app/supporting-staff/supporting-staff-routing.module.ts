import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NurseComponent } from './nurse/nurse.component';
import { ReceptionistComponent } from './receptionist/receptionist.component';
import { NurseGuard, ReceptionistGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'nurse',
    component: NurseComponent,
    canActivate:[NurseGuard]
  },
  {
    path: 'receptionist',
    component: ReceptionistComponent,
    canActivate:[ReceptionistGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportingStaffRoutingModule { }
