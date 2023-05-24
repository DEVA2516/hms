import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  roleId:number | undefined = undefined;

  authService:AuthService

  constructor () {
    this.authService = inject(AuthService);
  }

  ngOnInit() {
    const userDetails = this.authService.getUserDetails();
    this.roleId = userDetails?.roleId
  }


}
