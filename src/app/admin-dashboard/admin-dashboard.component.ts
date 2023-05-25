import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  username:string ='';
  password:string ='';
  message: string ='';
adminForm : FormGroup;
  constructor(private apiService:ApiService,private router:Router) { 
    this.adminForm = new FormGroup({
    uname :new  FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,10}$')]),
    pname : new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
  })

}

  loginSubmit(){

    this.apiService.adminLogin(this.adminForm.value).subscribe({
      next:(res:any) => {
      this.message = res.message;
      if(res.success){
        localStorage.setItem('token',res.data.token)
        this.router.navigate(['admin'])   
        this.apiService.successToast(res.message);
      }
    },error:(err:any) => this.apiService.errorToast(err.error.message)
  })
}

}
