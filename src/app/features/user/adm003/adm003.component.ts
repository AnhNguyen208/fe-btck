/**
 * Copyright(C) 2024  Luvina
 * Adm003Component.ts, 21/10/2024 AnhNLT
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMessages } from 'src/app/model/errorMessages';
import { Message } from 'src/app/model/message';
import { ResponseCode } from 'src/app/model/responseCode';
import { EmployeeService } from 'src/app/service/employee/employee.service';

@Component({
  selector: 'app-adm003',
  templateUrl: './adm003.component.html',
  styleUrls: ['./adm003.component.css']
})

/**
 * Component xử lý các chức năng của màn hình ADM003
 */
export class Adm003Component implements OnInit {
  employeeDetail: any;
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    const state = history.state;

    if (state && state.data) {
      // console.log('User ID:', state.data.id);
      this.getDetailEmployee(state.data.id)
    } else {
      this.router.navigate(['**'], { state: { message: ErrorMessages.ER023() } });
      console.log('No data passed in state');
    }
  }

  /**
   * Lấy thông tin chi tiết của employee từ EmployeeService
   * @param id EmployeeId muốn lấy thông tin
   */
  getDetailEmployee(id: number) {
    this.employeeService.getById(id).subscribe({
      next: (response) => {
        // console.log(response);
        if (response.code == ResponseCode.CODE_200) {
          this.employeeDetail = response;
          // console.log(this.employeeDetail);
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
   * Chuyển sang màn hình ADM004 Edit
   * @param id EmployeeId muốn chỉnh sửa
   */
  onClickEditButton(id: number) {
    const data = { id: id };
    this.router.navigate(['/user/adm004'], { state: { data: data } });
  }

  /**
   * Xóa employee
   * @param id EmployeeId muốn xóa
   */
  onClickDeleteButton(id: number) {
    if (window.confirm(Message.CONFIRM_MESSSAGE)) {
      this.employeeService.deleteById(id).subscribe({
        next: (response) => {
          // console.log(response);
          if (response.code == ResponseCode.CODE_200) {
            const data = { message: Message.DELETE_SUCCESS }
            this.router.navigate(['/user/adm006'], { state: { data: data } });
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

  }
}
