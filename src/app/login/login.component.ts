import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // username:string ='';
  // password:string ='';
  userForm:FormGroup;

  constructor(private apiService:ApiService) {
    this.userForm = new FormGroup({
      uname: new FormControl(null, [Validators.required]),
      pname: new FormControl(null, [Validators.required]),
    });

   }

  loginSubmit(){
    // console.log("subit........",(document.getElementById("username") as HTMLInputElement).value);
    // console.log(this.username,this.password);
    

    // let obj={
    //   uname:this.username,
    //   pname:this.password

    // }

    this.apiService.login(this.userForm.value)
  }

 
}


