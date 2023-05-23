import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportingStaffRoutingModule } from './supporting-staff-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { ReceptionistComponent } from './receptionist/receptionist.component';
import { NurseComponent } from './nurse/nurse.component';


@NgModule({
  declarations: [NurseComponent,ReceptionistComponent],
  imports: [
    CommonModule,
    SupportingStaffRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    DropdownModule,
    CheckboxModule,
    CalendarModule,
  ]
})
export default class SupportingStaffModule { }
