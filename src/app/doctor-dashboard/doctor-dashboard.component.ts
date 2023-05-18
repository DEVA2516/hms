import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent {

  username:string ='';
  password:string ='';
  message: string ='';
doctorForm : FormGroup;
  constructor(private apiService:ApiService,private router:Router) {
    this.doctorForm = new FormGroup({
      uname :new  FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,10}$')]),
      pname : new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
    })

   }

  loginSubmit(){


    this.apiService.doctorLogin(this.doctorForm.value).subscribe({
      next:(res:any) => {
      this.message = res.message;
      if(res.success){
        this.router.navigate(['doctor'])
      }
      this.apiService.successToast(res.message);
      localStorage.setItem('doctorId',res.data._id)
      localStorage.setItem("doctorName",res.data.docname)
    },error:(err:any) => this.apiService.errorToast(err.error.message)
  })
}
}
