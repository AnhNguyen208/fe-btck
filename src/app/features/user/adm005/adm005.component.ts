import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeRequest } from 'src/app/model/employeeRequest';
import { EmployeeService } from 'src/app/service/employee/employee.service';

@Component({
  selector: 'app-adm005',
  templateUrl: './adm005.component.html',
  styleUrls: ['./adm005.component.css']
})
export class Adm005Component implements OnInit{
  form: FormGroup<any>;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private datePipe: DatePipe,
    private route: Router,
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.loadEmployee();
  }

  /**
   * Hiển thị thông tin employee từ ADM004
   */
  loadEmployee() {
    const value = sessionStorage.getItem("employee");
    if(value) {
      this.form = this.fb.group(JSON.parse(value));
      console.log(this.form.value);
    }
  }

  /**
   * Xử lí khi submit form
   */
  submit() {
    let birthdate = this.datePipe.transform(this.form.value.employeeBirthDate, 'yyyy/MM/dd')?.toString() || '';
    let startDate = this.datePipe.transform(this.form.value.startDate, 'yyyy/MM/dd')?.toString() || '';
    let endDate = this.datePipe.transform(this.form.value.endDate, 'yyyy/MM/dd')?.toString() || '';
    const employeeRequest: EmployeeRequest = this.form.value.certificationId !== "" ? {
      employeeName: this.form.value.employeeName,
      employeeBirthDate: birthdate,
      employeeEmail: this.form.value.employeeEmail,
      employeeTelephone: this.form.value.employeeTelephone,
      employeeNameKana: this.form.value.employeeNameKana,
      employeeLoginId: this.form.value.employeeLoginId,
      employeeLoginPassword: this.form.value.employeeLoginPassword,
      departmentId: this.form.value.departmentId,
      certifications: [
        {
          certificationId: this.form.value.certificationId,
          certificationStartDate: startDate,
          certificationEndDate: endDate,
          employeeCertificationScore: this.form.value.score
        }
      ]
    } : 
    {
      employeeName: this.form.value.employeeName,
      employeeBirthDate: birthdate,
      employeeEmail: this.form.value.employeeEmail,
      employeeTelephone: this.form.value.employeeTelephone,
      employeeNameKana: this.form.value.employeeNameKana,
      employeeLoginId: this.form.value.employeeLoginId,
      employeeLoginPassword: this.form.value.employeeLoginPassword,
      departmentId: this.form.value.departmentId,
      certifications: []
    }
    ;
    this.employeeService.add(employeeRequest).subscribe({
      next: (response) => {
        console.log(response);
        if(response.code == "200") {
          this.route.navigate(['user/adm006'])
        } else {
          this.errorMessage = response.message.code + ' ' + response.message.params[0];
          console.log(this.errorMessage);
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    })
  }

}
