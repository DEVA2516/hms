import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  docForm: FormGroup
  username: string = '';
  password: string = '';
  display = false
  salarys: any;
  isViewSalary = false;
  docId = ''
  summary: Array<any> = [];
  isViewSummary = false;

  constructor(private apiService: ApiService, private router: Router) {
    this.docForm = new FormGroup({
      docname: new FormControl(null, [Validators.required]),
      phnnum: new FormControl(null, [Validators.required]),
      docemail: new FormControl(null, [Validators.required]),
      docpswd: new FormControl(null, [Validators.required]),
      docdept: new FormControl(null, [Validators.required]),
    })
  }
  ngOnInit(): void {
    this.getDoctorSalaryId()
    this.getDoctorById()
    this.getSummary()
    this.docId = localStorage.getItem("doctorId") ?? "";
  }

  get docControls() {
    return this.docForm.controls;
  }

  getDoctorById() {
    let id = String(localStorage.getItem('doctorId'))
    this.apiService.getDoctorById(id).subscribe({
      next: (res: any) => {
        this.docForm.patchValue({
          docname: res.data.docname,
          docdept: res.data.dept,
          phnnum: res.data.phnnum,
          docemail: res.data.username,
          docpswd: res.data.pswd
        });
        this.docForm.disable()
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }

  getDoctorSalaryId() {
    let id = String(localStorage.getItem('doctorName'))
    this.apiService.getDocSalary(id).subscribe({
      next: (res: any) => {
        this.salarys = res.data
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

  getSummary() {
    this.apiService.getSummaryList().subscribe({
      next: (res: any) => {
        this.summary = res.data
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }


}

