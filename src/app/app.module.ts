import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DoctorComponent } from './doctor/doctor.component';
import { SignupComponent } from './signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';
import { DepartmentComponent } from './department/department.component';
import { SupportingStaffComponent } from './supporting-staff/supporting-staff.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BillingDashboardComponent } from './billing-dashboard/billing-dashboard.component';
import { SupportingstaffdashboardComponent } from './supportingstaffdashboard/supportingstaffdashboard.component';
import { AdminComponent } from './admin/admin.component';
import { BillerComponent } from './biller/biller.component';
import { PatientComponent } from './patient/patient.component';
import { NurseComponent } from './nurse/nurse.component';
import { ReceptionistComponent } from './receptionist/receptionist.component';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ResetPswdComponent } from './reset-pswd/reset-pswd.component';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import { Home1Component } from './home1/home1.component';
import { AppointmentComponent } from './appointment/appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DoctorComponent,
    SignupComponent,
    ContactComponent,
    GalleryComponent,
    DepartmentComponent,
    SupportingStaffComponent,
    DoctorDashboardComponent,
    PatientDashboardComponent,
    AdminDashboardComponent,
    AboutusComponent,
    HomeComponent,
    DashboardComponent,
    BillingDashboardComponent,
    SupportingstaffdashboardComponent,
    AdminComponent,
    BillerComponent,
    PatientComponent,
    NurseComponent,
    ReceptionistComponent,
    ResetPswdComponent,
    Home1Component,
    AppointmentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    ToastModule,
    DropdownModule,
    CheckboxModule,
    CalendarModule
    ],

  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
