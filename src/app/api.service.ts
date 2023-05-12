import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class ApiService {


 

  constructor(private http: HttpClient, private messageService: MessageService) { }

  login(data: any) {
    this.http.post('http://localhost:3000/login', data);
  }

  addPatient(value: any) {
    return this.http.post('http://localhost:3000/addPatient', value)
  }

  makeAppointment(value: any) {
    return this.http.post('http://localhost:3000/makeAppointment', value)
  }

  signup(data: any) {
    return this.http.post('http://localhost:3000/signup', data)
  }

  getDepartment() {
    return this.http.get('http://localhost:3000/department')
  }

  getTimeSlots() {
    return this.http.get('http://localhost:3000/getTimeSlots')
  }

  doctorLogin(data: any) {
    return this.http.post('http://localhost:3000/doctorLogin', data)
  }

  patientLogin(data: any) {
    return this.http.post('http://localhost:3000/patientLogin', data)
  }

  supportingstaffLogin(data: any) {
    return this.http.post('http://localhost:3000/supportingstaffLogin', data)
  }

  adminLogin(data: any) {
    return this.http.post('http://localhost:3000/adminLogin', data)
  }

  addDepartment(data: any) {
    return this.http.post('http://localhost:3000/addDepartment', data)
  }

  addSupportingstaff(data: any) {
    return this.http.post('http://localhost:3000/addSupportingstaff', data)
  }


  addDoctor(data: any) {
    return this.http.post('http://localhost:3000/addDoctor', data)
  }

  addPaient(data: any) {
    return this.http.post('http://localhost:3000/addPatient', data)
  }

  getPatient(){
    return this.http.get('http://localhost:3000/patient')
  }

  

  getPatientById(id:string){
    return this.http.get('http://localhost:3000/patientById?id='+id)
  }

  getDoctor(){
    return this.http.get('http://localhost:3000/doctor')
  }
  
  getAppointMents(){
      return this.http.get('http://localhost:3000/getAppointMents')
  }

  getDoctorById(id:number){
    return this.http.get('http://localhost:3000/doctorById?id='+id)
  }

  getAppointMentsById(id:string){
    return this.http.get('http://localhost:3000/getAppointMentsById?id='+id)
  }

  successToast(message:string) {
    this.messageService.add(
      { severity: 'success', detail: message });
  }

  errorToast(message:string) {
    this.messageService.add(
      { severity: 'error', detail: message });
  }

  generateBill(data:any){
    return this.http.post('http://localhost:3000/generateBill', data)
  }

  getBills(){
    return this.http.get('http://localhost:3000/getBills')
  }

  getBillById(id:string){
    return this.http.get('http://localhost:3000/getBillById?id='+id)
  }

  updateBill(data:any){
    return this.http.post('http://localhost:3000/updateBillStatus', data)
  }

  getSummaryById(id:string){
    return this.http.get('http://localhost:3000/getSummaryById?id='+id)
  }

  updateSummary(data:any){
    return this.http.post('http://localhost:3000/updateSummary', data)

  }
  

  updateSalary(data:any){
    return this.http.post('http://localhost:3000/updateSalary', data)

  }

  getDocSalary(id:number){
    return this.http.get('http://localhost:3000/getDocSalary?id='+id)
  }

}
