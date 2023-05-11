import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit{

  department:Array<any>= [];

constructor(private apiService:ApiService){}

ngOnInit(): void {
  this.apiService.getDepartment().subscribe((res: any) => {
    console.log(res)
    this.department = res.data;
  })
}
  
}
