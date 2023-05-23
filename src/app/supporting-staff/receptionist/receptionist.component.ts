import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.css']
})
export class ReceptionistComponent {
  disp = false;
  patForm: any;
  appointments:Array<any> = [];
  isAppointments = false;
  isUpdateAppointment = false;
  
  constructor (private apiService: ApiService, private router: Router){
    this.patForm = new FormGroup({
      patname : new FormControl(null, [Validators.required]),
      address : new FormControl(null, [Validators.required]),
      phnnum : new FormControl(null, [Validators.required,Validators.pattern(/^[\d\+\(\)\-\s]+$/),Validators.minLength(10),Validators.maxLength(10)]),
      age : new FormControl(null, [Validators.required,Validators.pattern(/^[\d\+\(\)\-\s]+$/),Validators.maxLength(2)]),
      gender : new FormControl(null, [Validators.required]),
      patemail : new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,10}$')]),
      patpswd : new FormControl(null, [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
    })
  }

  ngOnInit(){
    this.getAppointMents()
  }

  get patControls() {
    return this.patForm.controls;
  }

  patSubmit(){
    this.apiService.addPatient(this.patForm.value).subscribe({
      next:(res:any) => {
      console.log(res);
      if (res.success){
        this.router.navigate(['receptionist'])
        this.apiService.successToast(res.message)
        this.patForm.reset();
      }
    },error:(err:any) => this.apiService.errorToast(err.error.message)
  })
  }

  getAppointMents(){
    this.apiService.getAppointMents().subscribe({
      next : (res:any) => {
        this.appointments = res.data;
      }
    })
  }
}
