import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  uname: string = '';
  email: string = '';
  phonenumber: string = '';
  address: string = '';
  age: string = '';
  gender: string = '';
  pswd: string = '';
  constructor(private apiService: ApiService) { }
  signup_submit() {
    console.log(this.uname)
    console.log(this.email)
    console.log(this.phonenumber)
    console.log(this.address)
    console.log(this.age)
    console.log(this.gender)
    console.log(this.pswd)

    let signupobj = {
      uname: this.uname,
      email: this.email,
      phonenumber: this.phonenumber,
      address: this.address,
      age: this.age,
      gender: this.gender,
      pswd: this.pswd
    }
    this.apiService.signup(signupobj).subscribe((res: any) => console.log(res)
    )
  }
}
