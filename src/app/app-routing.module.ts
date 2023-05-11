import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { BillingDashboardComponent } from './billing-dashboard/billing-dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { DepartmentComponent } from './department/department.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { DoctorComponent } from './doctor/doctor.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent  } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NurseComponent } from './nurse/nurse.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientComponent } from './patient/patient.component';
import { ReceptionistComponent } from './receptionist/receptionist.component';
import { ResetPswdComponent } from './reset-pswd/reset-pswd.component';
import { SignupComponent } from './signup/signup.component';
import { SupportingStaffComponent } from './supporting-staff/supporting-staff.component';
import { SupportingstaffdashboardComponent } from './supportingstaffdashboard/supportingstaffdashboard.component';
import { BillerComponent } from './biller/biller.component';
import { Home1Component } from './home1/home1.component';
import { AppointmentComponent } from './appointment/appointment.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'aboutus',
    component: AboutusComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'doctor-dashboard',
    component: DoctorDashboardComponent
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'patient-dashboard',
    component: PatientDashboardComponent,
  },
  {
    path: 'billing-dashboard',
    component: BillingDashboardComponent,
  },
  {
    path: 'supportingstaffdashboard',
    component: SupportingstaffdashboardComponent,
  },
  {
    path: 'department',
    component: DepartmentComponent,
  },
  {
    path: 'doctor',
    component: DoctorComponent,
  },
  {
    path: 'supporting-staff',
    component: SupportingStaffComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'patient',
    component: PatientComponent,
  },
  {
    path: 'nurse',
    component: NurseComponent,
  },
  {
    path: 'receptionist',
    component: ReceptionistComponent,
  },
  {
    path: 'reset-pass',
    component: ResetPswdComponent,
  },
  {
    path:'biller',
    component:BillerComponent,
  },
  {
    path:'home1',
    component:Home1Component,
  },
  {
    path:'appointment',
    component:AppointmentComponent,
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
