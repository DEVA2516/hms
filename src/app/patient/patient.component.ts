import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  bills: Array<any> = [];
  isViewBill = false;
  patForm: FormGroup;
  disp = false;
  patientList: any;
  summary: Array<any> = [];
  isViewSummary = false;
  appForm: FormGroup;
  isAppoint = false
  doctorList: Array<any> = [];
  timeSlotsList:Array<any> = [];
  appointmentList:Array<any> = [];
  userDetails = {
    id:"",
    userName:"",
    email:"",
    iat:0
  }
  minDate:Date = new Date();

  isAppointView = false;

  constructor(private apiService: ApiService, private router: Router) {

    this.patForm = new FormGroup({
      patname: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      phnnum: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      patemail: new FormControl(null, [Validators.required]),
      patpswd: new FormControl(null, [Validators.required]),
    })

    this.appForm = new FormGroup({
      docname: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      date : new FormControl(null, [Validators.required]),
      phonenum : new FormControl(null, [Validators.required])
    })
  }

  get patControls() {
    return this.patForm.controls;
  }

  get aptControls() {
    return this.appForm.controls;
  }

  ngOnInit(): void {

    const token = localStorage.getItem('token');


    if(token) {
      const deToken = jwtDecode<any>(token);
      console.log(deToken);
      this.userDetails = deToken;
    }

    this.getBills();
    this.getPatientById();
    this.getSummary();
    this.getAllDoctors();
    this.getAllTimeSlots();
    this.getAppointMentsById();
  }

  getAllDoctors() {
    this.apiService.getDoctor().subscribe({
      next: (res: any) => {
        this.doctorList = res.data
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }

  getAllTimeSlots() {
    this.apiService.getTimeSlots().subscribe({
      next: (res: any) => {
        this.timeSlotsList = res.data
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }
  
  getBills() {
    this.apiService.getBillById().subscribe({
      next: (res: any) => {
        this.bills = res.data
        console.log(res);
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }

  patSubmit() {
    this.apiService.addPatient(this.patForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.success) {
          this.apiService.successToast(res.message)

        }
      }, error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }

  makeAppointment() {
    this.appForm.value['patname'] = this.userDetails.userName;
    this.apiService.makeAppointment(this.appForm.value).subscribe({
      next: (res: any) => {
          this.apiService.successToast(res.message)
          this.getAppointMentsById();
      }, error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }

  getPatientById() {
    this.apiService.getPatientById().subscribe({
      next: (res: any) => {
        this.patForm.patchValue({
          patname: res.data.patname,
          address: res.data.address,
          age: res.data.age,
          gender: res.data.gender,
          phnnum: res.data.phnnum,
          patemail: res.data.username,
          patpswd: res.data.pswd
        });
        this.patForm.disable();
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }

  getSummary() {
    this.apiService.getSummaryById().subscribe({
      next: (res: any) => {
      
        this.summary = res.data
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }

  getAppointMentsById() {
    this.apiService.getAppointMentsById().subscribe({
      next: (res: any) => {
        this.appointmentList = res.data
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }

  download(file:any){
    let a = document.createElement('a');
    a.href = file;
    a.download = `Report.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    this.apiService.successToast("Document downloaded successfully...")
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['home1']);
  }
  

}
