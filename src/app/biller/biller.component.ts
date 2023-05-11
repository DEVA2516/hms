import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-biller',
  templateUrl: './biller.component.html',
  styleUrls: ['./biller.component.css']
})
export class BillerComponent implements OnInit {

  bills:Array<any> = [];
  isViewBill = false;
  display = false;
  billForm: FormGroup
  patientList: any;

  constructor(private apiService: ApiService, private router: Router) {

    this.billForm = new FormGroup({
      billNo: new FormControl(null, [Validators.required]),
      status: new FormControl(null, []),
      patientName: new FormControl(null, [Validators.required]),

    });

  }
  
  ngOnInit(): void {
    this.getBills();
    this.getAllPatients()
  }

  get billControls() {
    return this.billForm.controls
  }

  getBills(){
    this.apiService.getBills().subscribe({
      next: (res: any) => {
        this.bills = res.data
        console.log(res);
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }

  updateBill(){
    this.apiService.updateBill(this.billForm.value).subscribe({
      next: (res: any) => {
       this.apiService.successToast(res.message)
       this.getBills()
       this.billForm.reset();
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }


  getAllPatients() {
    this.apiService.getPatient().subscribe({
      next: (res: any) => {
        this.patientList = res
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }
  
  
}
