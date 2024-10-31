/**
 * Copyright(C) 2024  Luvina
 * UserListComponent.ts, 04/10/2024 AnhNLT
 */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DepartmentService } from 'src/app/service/department/department.service';
import { Department } from 'src/app/model/department';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { Router } from '@angular/router';
import { ErrorMessages } from 'src/app/model/errorMessages';
import { ResponseCode } from 'src/app/model/responseCode';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

/**
 * Component xử lý các chức năng của màn hình ADM002
 */
export class UserListComponent {
  departments: Department[] = [];
  employees: Employee[] = [];
  form: FormGroup<any>;
  currentPage: number = 1;
  pages: number[] = [];
  totalPages: number = 0;
  totalRecords: number = 0;
  limit: number = 5;

  constructor(
    private router: Router,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      departmentId: [''],
      employeeName: ['', [Validators.maxLength(125)]],
      ordEmployeeName: ['ASC'],
      ordCertificationName: ['ASC'],
      ordEndDate: ['ASC'],
    });

    this.form.valueChanges.subscribe(() => {
      sessionStorage.setItem("search", JSON.stringify(this.form.value));
    })
  }

  // Sử dụng ViewChild để lấy tham chiếu đến input đầu tiên
  @ViewChild('firstInput')
  firstInputElement!: ElementRef;

  ngOnInit(): void {
    this.getSearchValue();
    this.getDepartments();
    this.getEmployees();
  };

  ngAfterViewInit(): void {
    // Focus vào phần tử đầu tiên sau khi view được khởi tạo
    this.firstInputElement.nativeElement.focus();
  }

  /**
   * Lấy thông tin tìm kiếm trong session
   */
  getSearchValue() {
    const value = sessionStorage.getItem("search");
    if (value) {
      let searchValue = JSON.parse(value);

      this.form.patchValue({
        departmentId: searchValue.departmentId,
        employeeName: searchValue.employeeName,
        ordEmployeeName: searchValue.ordEmployeeName,
        ordCertificationName: searchValue.ordCertificationName,
        ordEndDate: searchValue.ordEndDate,
      });
    }
  }

  /**
   * Lấy danh sách department
   */
  getDepartments() {
    this.departmentService.getAll()
      .subscribe({
        next: (response) => {
          // console.log(response);
          if (response.code == ResponseCode.CODE_200) {
            this.departments = response.departments;
          } else {
            this.router.navigate(['**'], { state: { message: ErrorMessages.ER023() } });
          }
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          // console.log('complete');
        }
      });
  }

  /**
   * Lấy danh sách employee
   */
  getEmployees() {
    this.employeeService.getAll(this.form.value.employeeName,
      this.form.value.departmentId, this.form.value.ordEmployeeName,
      this.form.value.ordCertificationName, this.form.value.ordEndDate, (this.currentPage - 1) * this.limit, this.limit)
      .subscribe({
        next: (response) => {
          // console.log(response);
          this.employees = response.employees;
          this.totalRecords = response.totalRecords;
          this.totalPages = Math.ceil(this.totalRecords / this.limit);

          // console.log(this.totalPages);
          // console.log(this.employees.length);

          if (this.employees.length === 0 && this.currentPage > 1) {
            this.changePage(this.currentPage - 1);
          }

          this.paginationPages();
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['SystemErrorComponent'])
        },
        complete: () => {
          // console.log('complete');
        }
      });
  }

  /**
   * Tìm kiếm employee và quay về trang 1
   */
  search() {
    this.currentPage = 1;
    this.getEmployees();
  }

  /**
   * Thay đổi cách sắp xếp danh sách employee theo employeeName
   */
  changeOrderEmployeeName() {
    if (this.form.value.ordEmployeeName === 'ASC') {
      this.form.patchValue({
        ordEmployeeName: 'DESC'
      });
    } else {
      this.form.patchValue({
        ordEmployeeName: 'ASC'
      });
    }

    this.search();
  }

  /**
   * Thay đổi cách sắp xếp danh sách employee theo certificationName
   */
  changeOrderCertificationName() {
    if (this.form.value.ordCertificationName === 'ASC') {
      this.form.patchValue({
        ordCertificationName: 'DESC'
      });
    } else {
      this.form.patchValue({
        ordCertificationName: 'ASC'
      });
    }

    this.search();
  }

  /**
   * Thay đổi cách sắp xếp danh sách employee theo endDate
   */
  changeOrderEndDate() {
    if (this.form.value.ordEndDate === 'ASC') {
      this.form.patchValue({
        ordEndDate: 'DESC'
      });
    } else {
      this.form.patchValue({
        ordEndDate: 'ASC'
      });
    }

    this.search();
  }

  /**
   * Xử lí hiển thị pagination
   */
  paginationPages() {
    this.pages = [];
    const total = this.totalPages;

    if (total > 1) {
      if (this.currentPage > 1 && this.currentPage < total) {
        this.pages.push(this.currentPage - 1);
        this.pages.push(this.currentPage);
        this.pages.push(this.currentPage + 1);
      }

      if (this.currentPage === 1) {
        this.pages.push(2);
      }

      if (this.currentPage === this.totalPages) {
        this.pages.push(this.totalPages - 1);
      }

      this.pages = this.pages.filter(item => item !== 1);
      this.pages = this.pages.filter(item => item !== this.totalPages);
    }
  }

  /**
   * Xử lí hiển thị danh sách employee khi chuyển trang
   * @param page trang muốn chọn
   */
  changePage(page: number) {
    this.currentPage = page;
    this.getEmployees();
  }

  /**
   * Chuyển sang màn hinh ADM003
   */
  getDetail(id: number) {
    const data = { id: id };
    this.router.navigate(['/user/adm003'], { state: { data: data } });
  }
}
