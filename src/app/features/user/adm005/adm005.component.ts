import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeRequest } from 'src/app/model/employeeRequest';
import { Message } from 'src/app/model/messages';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { MessageService } from 'src/app/service/message.service';

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
    private router: Router,
    private messageService: MessageService,
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.loadEmployee();
  }

  /**
   * Lấy thông tin employee từ sessionStorage
   */
  loadEmployee() {
    const value = sessionStorage.getItem("employee");
    if (value) {
      this.form = this.fb.group(JSON.parse(value));
      console.log(this.form.value);
    }
  }

  /**
   * Xử lí khi submit form
   */
  submit() {
    if (this.form.get('employeeId')?.value) {
      this.editEmployee();
    } else {
      this.addEmployee();
    }
    
  }

  /**
   * Gửi request thêm mới employyee đến BE
   * Xử lý response nhận được từ BE
   */
  addEmployee() {
    let birthdate = this.datePipe.transform(this.form.value.employeeBirthDate, 'yyyy/MM/dd')?.toString() || '';
    let startDate = this.datePipe.transform(this.form.value.certifications.startDate, 'yyyy/MM/dd')?.toString() || '';
    let endDate = this.datePipe.transform(this.form.value.certifications.endDate, 'yyyy/MM/dd')?.toString() || '';
    const employeeRequest: EmployeeRequest = this.form.value.certifications.certificationId !== "" ? {
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
          certificationId: this.form.value.certifications.certificationId,
          certificationStartDate: startDate,
          certificationEndDate: endDate,
          employeeCertificationScore: this.form.value.certifications.score
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
        if (response.code == "200") {
          const data = {message: Message.ADD_SUCCESS}
          this.router.navigate(['/user/adm006'], { state: { data: data } });
        } else {
          this.errorMessage = this.messageService.getMessages(response.message.code, response.message.params[0]);
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

  /**
   * Gửi request chỉnh s employyee đến BE
   * Xử lý response nhận được từ BE
   */
  editEmployee() {
    let birthdate = this.datePipe.transform(this.form.value.employeeBirthDate, 'yyyy/MM/dd')?.toString() || '';
    let startDate = this.datePipe.transform(this.form.value.certifications.startDate, 'yyyy/MM/dd')?.toString() || '';
    let endDate = this.datePipe.transform(this.form.value.certifications.endDate, 'yyyy/MM/dd')?.toString() || '';
    const employeeRequest: EmployeeRequest = this.form.value.certifications.certificationId !== "" ? {
      employeeId: this.form.value.employeeId,
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
          certificationId: this.form.value.certifications.certificationId,
          certificationStartDate: startDate,
          certificationEndDate: endDate,
          employeeCertificationScore: this.form.value.certifications.score
        }
      ]
    } : 
    {
      employeeId: this.form.value.employeeId,
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
    this.employeeService.edit(employeeRequest).subscribe({
      next: (response) => {
        console.log(response);
        if (response.code == "200") {
          const data = {message: Message.EDIT_SUCCESS}
          this.router.navigate(['/user/adm006'], { state: { data: data } });
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
