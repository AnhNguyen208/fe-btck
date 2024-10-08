import { Component } from '@angular/core';
import { DepartmentService } from 'src/app/shared/department/department.service';
import { Deaprtment } from 'src/app/model/department';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/shared/employee/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  departments: Deaprtment[] = [];
  employees: Employee[] = [];
  form: FormGroup<any>;
  currentPage:number = 1;
  pages:number[] = [];
  totalPages:number = 0;
  totalRecords:number = 0;
  limit:number = 5;
  ord_employee_name:string = 'ASC';
  ord_certification_name:string = 'ASC';
  ord_end_date:string = 'ASC';

  constructor(
    private router: Router,
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
    this.getEmployees();
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

  getEmployees() {
    this.employeeService.getAll(this.form.value.employeeName,
      this.form.value.departmentId, this.ord_employee_name,
      this.ord_certification_name, this.ord_end_date, (this.currentPage - 1) * this.limit, this.limit)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.employees = response.employees;
        this.totalRecords = response.totalRecords;
        this.totalPages = Math.ceil(this.totalRecords / this.limit);
        
        console.log(this.totalPages);
        console.log(this.employees.length);

        if(this.employees.length === 0 && this.currentPage > 1) {
          this.changePage(this.currentPage - 1);
        }

        this.paginationPages();
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(['SystemErrorComponent'])
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  search() {
   this.currentPage = 1;
   this.getEmployees();
  }

  changeOrderEmployeeName() {
    if(this.ord_employee_name === 'ASC') {
      this.ord_employee_name = 'DESC';
    } else {
      this.ord_employee_name = 'ASC'
    }

    this.search();
  }

  changeOrderCertificationName() {
    console.log(this.ord_certification_name);
    if(this.ord_certification_name === 'ASC') {
      this.ord_certification_name = 'DESC';
    } else {
      this.ord_certification_name = 'ASC'
    }

    this.search();
  }

  changeOrderEndDate() {
    if(this.ord_end_date === 'ASC') {
      this.ord_end_date = 'DESC';
    } else {
      this.ord_end_date = 'ASC'
    }

    this.search();
  }

  paginationPages() {
    this.pages = [];
    const total = this.totalPages;

    if (total > 1) {
      if(this.currentPage > 1 && this.currentPage < total) {
        this.pages.push(this.currentPage - 1);
        this.pages.push(this.currentPage);
        this.pages.push(this.currentPage + 1);
      }

      if(this.currentPage === 1) {
        this.pages.push(2);
      }

      if(this.currentPage === this.totalPages) {
        this.pages.push(this.totalPages - 1);
      }
  
      this.pages = this.pages.filter(item => item !== 1);
      this.pages = this.pages.filter(item => item !== this.totalPages);
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getEmployees();
  }
}
