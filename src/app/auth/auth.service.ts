import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

export interface UserDetails {
  id:string,
  userName:string,
  email:string,
  roleId:number
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  getUserDetails() {
    const token = localStorage.getItem('token');
    
    try {
      if(token) {
        const deToken = jwtDecode<UserDetails>(token);
        return deToken
      }
      return null

    }catch (err){
      console.log(err);
      return null
    }
    
  }

  isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

}
 