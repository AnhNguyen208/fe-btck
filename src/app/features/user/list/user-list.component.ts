import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppConstants } from "../../../app-constants";
import { DepartmentService } from 'src/app/shared/department/department.service';
import { Deaprtment } from 'src/app/model/department';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/shared/employee/employee.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  departments: Deaprtment[] = [];
  employees: Employee[] = [];
  form: FormGroup<any>;
  ord_employee_name: string = 'ASC';
  ord_certification_name: string = 'ASC';
  ord_end_date: string = 'ASC';
  
  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      departmentId: [''],
      employeeName: [''],
    });
   }

  ngOnInit(): void {
    this.getDepartments();
    this.search();
  };

  getDepartments() {
    this.departmentService.getAll()
    .subscribe({
      next: (response) => {
        console.log(response);
        this.departments = response.departments;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  search() {
    this.employeeService.getAll(this.form.value.employeeName,
      this.form.value.departmentId, this.ord_employee_name,
      this.ord_certification_name, this.ord_end_date, 0, 5)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.employees = response.employees;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }
}
