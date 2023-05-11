import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-supportingstaffdashboard',
  templateUrl: './supportingstaffdashboard.component.html',
  styleUrls: ['./supportingstaffdashboard.component.css']
})
export class SupportingstaffdashboardComponent {
  username: string = '';
  password: string = '';
  type: string = '';
  message: string = '';

  userForm : FormGroup;

  types = [
    { id: 1, name: 'RECEPTIONIST', value: 'receptionist' },
    { id: 2, name: 'NURSE', value: 'nurse' },
    // { id: 2, name: 'BILLER', value: 'biller' },
  ]

  constructor(private apiService: ApiService, private router: Router) {
    this.userForm = new FormGroup ( {
      uname:new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,10}$')]),
      pname:new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      type:new FormControl(null,[]),
    })


    console.log("log --> formGroup",this.userForm);
    
  }

  loginSubmit() {

    // if(this.userForm.invalid){
    //   this.userForm.markAllAsTouched();
    //   re
    // }

    if (this.userForm.value.type == 'receptionist') {
      this.apiService.supportingstaffLogin(this.userForm.value).subscribe({
        next: (res: any) => {
          this.message = res.message;
          if (res.success) {
            this.router.navigate(['receptionist'])
            this.apiService.successToast(res.message)
          }
        }, error: (err: any) => this.apiService.errorToast(err.error.message)
      })
    }

    if (this.userForm.value.type == 'nurse') {
      this.apiService.supportingstaffLogin(this.userForm.value).subscribe({
        next: (res: any) => {
          this.message = res.message;
          if (res.success) {
            this.router.navigate(['nurse'])
            this.apiService.successToast(res.message)
          }
        }, error: (err: any) => this.apiService.errorToast(err.error.message)
      })
    }

    if (this.userForm.value.type == 'biller') {
      this.apiService.supportingstaffLogin(this.userForm.value).subscribe({
        next: (res: any) => {
          this.message = res.message;
          if (res.success) {
            this.router.navigate(['biller'])
            this.apiService.successToast(res.message)
          }
        }, error: (err: any) => this.apiService.errorToast(err.error.message)
      })
    }
  }

}
