import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {

  display = false;
  billForm: FormGroup;
  patForm:FormGroup;
  patientList:Array<any> = []
  display1 = false;
  summaryFile:File | null = null;

  constructor(private apiService: ApiService, private router: Router) {

      this.billForm = new FormGroup({
        patientName: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [Validators.required]),
      });

      this.patForm = new FormGroup({
        patientName: new FormControl(null, [Validators.required]),
        summary: new FormControl(null, [Validators.required]),
      });

  }
  ngOnInit(): void {
    this.getAllPatients();
  }

  onFileChange(event:Event){

    const control = this.patForm.get("summary")
    const tar = event.target as HTMLInputElement;
    let file:File | null = null
    if(tar.files?.length){
      file = tar.files[0];
      // this.summaryFile = tar.files[0];
      if(file.size < 5 * 1024 * 1024) {
        control?.setErrors({fileSize:true})
      }
      control?.setValue(file.name);
    }

    if(control?.valid){
      this.summaryFile = file;
    }

    console.log(this.summaryFile)

  }

  get billControls() {
    return this.billForm.controls
  }

  get patControls() {
    return this.patForm.controls
  }

  getAllPatients() {
    this.apiService.getPatient().subscribe({
      next: (res: any) => {
        this.patientList = res.data
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }

  billSubmit(){
    this.apiService.generateBill(this.billForm.value).subscribe({
      next: (res: any) => {
       this.apiService.successToast(res.message)
       this.billForm.reset();
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })
  }

  patSumbit(){

    const formData = new FormData();
    formData.set("file",this.summaryFile as File)
    formData.set("patientName",this.patForm.value["patientName"])

    this.apiService.updateSummary(formData).subscribe({
      next: (res: any) => {
       this.apiService.successToast(res.message)
       this.patForm.reset();
      },
      error: (err: any) => this.apiService.errorToast(err.error.message)
    })

  }

 

}
