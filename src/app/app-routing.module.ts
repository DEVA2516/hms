import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BillingDashboardComponent } from './billing-dashboard/billing-dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { DepartmentComponent } from './department/department.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent  } from './home/home.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { SupportingstaffdashboardComponent } from './supportingstaffdashboard/supportingstaffdashboard.component';
import { BillerComponent } from './biller/biller.component';
import { Home1Component } from './home1/home1.component';
import { AdminGuard, AuthenticationGuard, DoctorGuard, PatientGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path:"",
    redirectTo:"home1",
    pathMatch:"full"
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
    component: DoctorDashboardComponent,
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'patient-dashboard',
    component: PatientDashboardComponent,
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'billing-dashboard',
    component: BillingDashboardComponent,
  },
  {
    path: 'supportingstaffdashboard',
    component: SupportingstaffdashboardComponent,
    canActivate:[AuthenticationGuard]

  },
  {
    path: 'department',
    component: DepartmentComponent,
  },
  {
    path:"admin",
    loadChildren:() => import("./admin/admin.module"),
    canActivate:[AdminGuard]
  },
  {
    path: 'doctor',
    loadChildren:() => import("./doctor/doctor.module"),
    canActivate:[DoctorGuard]
  },
  {
    path: 'patient',
    loadChildren:() => import("./patient/patient.module"),
    canActivate:[PatientGuard]
  },
  {
    path :"supporting",
    loadChildren:() => import("./supporting-staff/supporting-staff.module"),
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
    path :"**",
    loadComponent:() => import("./page-not-found/page-not-found.component")
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
