import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';
import { DepartmentComponent } from './department/department.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BillingDashboardComponent } from './billing-dashboard/billing-dashboard.component';
import { SupportingstaffdashboardComponent } from './supportingstaffdashboard/supportingstaffdashboard.component';
import { BillerComponent } from './biller/biller.component';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import { MiddlewareInterceptor } from './interceptor/middleware.interceptor';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, POSITION, SPINNER } from 'ngx-ui-loader';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#242956',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 50,
  blur: 0,
  fgsType: SPINNER.ballSpinClockwise,
  hasProgressBar:false,
  overlayColor: "rgba(40,40,40,0.12)",
};

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ContactComponent,
    GalleryComponent,
    DepartmentComponent,
    DoctorDashboardComponent,
    PatientDashboardComponent,
    AdminDashboardComponent,
    AboutusComponent,
    HomeComponent,
    DashboardComponent,
    BillingDashboardComponent,
    SupportingstaffdashboardComponent,
    BillerComponent,
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
    CalendarModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({showForeground:true}),
    ],

  providers: [MessageService,   {
    provide: HTTP_INTERCEPTORS,
    useClass: MiddlewareInterceptor,
    multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
