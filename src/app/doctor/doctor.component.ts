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
  }

  get docControls() {
    return this.docForm.controls;
  }

  getDoctorById() {
    let id = Number(localStorage.getItem('doctorId'))
    this.apiService.getDoctorById(id).subscribe({
      next: (res: any) => {
        this.docForm.patchValue({
          docname: res[0].dname,
          docdept: res[0].dept_name,
          phnnum: res[0].phn_no,
          docemail: res[0].email,
          docpswd: res[0].pswd
        });
        // this.patForm.get('patemail')?.disable()
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }

  getDoctorSalaryId() {
    let id = Number(localStorage.getItem('doctorId'))
    this.apiService.getDocSalary(id).subscribe({
      next: (res: any) => {
        this.salarys = res
        // this.patForm.get('patemail')?.disable()
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }




}

