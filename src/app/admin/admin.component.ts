import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../api.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  display = false;
  display1 = false;
  display2 = false;
  display3 = false;

  deptForm: any;
  suppForm: any;
  docForm: any;
  docSalaryForm: any;

  department: Array<any> = [];
  minDate = new Date()

  types = [
    { id: 1, name: "RECEPTIONIST", value: "receptionist" },
    { id: 2, name: "NURSE", value: "nurse" },
    { id: 2, name: "BILLER", value: "biller" },
  ];
  doctorList: Array<any> = [];

  constructor(private apiService: ApiService, private router: Router) {
    this.deptForm = new FormGroup({
      deptname: new FormControl(null, [Validators.required]),
      deptlocation: new FormControl(null, [Validators.required]),
    });

    this.suppForm = new FormGroup({
      suppname: new FormControl(null, [Validators.required]),
      suppemail: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,10}$"
        ),
      ]),
      supppswd: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        ),
      ]),
      suppgender: new FormControl(null, [Validators.required]),
      supptype: new FormControl(null, [Validators.required]),
    });

    this.docForm = new FormGroup({
      docname: new FormControl(null, [Validators.required]),
      phnnum: new FormControl(null, [
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      ]),
      docemail: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,10}$"
        ),
      ]),
      docpswd: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        ),
      ]),
      docdept: new FormControl(null, [Validators.required]),
    });

    this.docSalaryForm = new FormGroup({
      docId: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, []),
      creditDate: new FormControl(null, []),
    });
  }
  ngOnInit(): void {
    this.getAllDoctors();
    this.getDepartMent();
  }

  loginSubmit() {
    console.log(this.deptForm.value);
    this.apiService.addDepartment(this.deptForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.success) {
          this.router.navigate(["department"]);
          this.apiService.successToast(res.message);
          this.deptForm.reset();
        }
      },
      error: (err: any) => this.apiService.errorToast(err.error.message),
    });
  }

  get deptControls() {
    return this.deptForm.controls;
  }

  get suppControls() {
    return this.suppForm.controls;
  }

  get docControls() {
    return this.docForm.controls;
  }

  get salControls() {
    return this.docSalaryForm.controls;
  }

  suppSubmit() {
    console.log(this.suppForm.value);
    this.apiService.addSupportingstaff(this.suppForm.value).subscribe({
      next: (res: any) => {
        this.router.navigate(["admin"]);
        this.apiService.successToast(res.message);
        this.suppForm.reset();
      },
      error: (err: any) => this.apiService.errorToast(err.error.message),
    });
  }

  docSubmit() {
    console.log(this.docForm.value);
    this.apiService.addDoctor(this.docForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.router.navigate(["admin"]);
        this.apiService.successToast(res.message);
        this.docForm.reset();
      },
      error: (err: any) => this.apiService.errorToast(err.error.message),
    });
  }

  getAllDoctors() {
    this.apiService.getDoctor().subscribe({
      next: (res: any) => {
        this.doctorList = res.data;
      },
      error: (err: any) => this.apiService.errorToast(err.error.message),
    });
  }

  updateSalary() {
    this.apiService.updateSalary(this.docSalaryForm.value).subscribe({
      next: (res: any) => {
        this.apiService.successToast(res.message);
        this.docSalaryForm.reset();
      },
      error: (err: any) => this.apiService.errorToast(err.error.message),
    });
  }

  getDepartMent() {
    this.apiService.getDepartment().subscribe({
      next: (res: any) => {
        console.log(res);
        this.department = res.data;
      },
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["home1"]);
  }
}
