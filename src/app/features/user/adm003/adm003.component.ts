import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee/employee.service';

@Component({
  selector: 'app-adm003',
  templateUrl: './adm003.component.html',
  styleUrls: ['./adm003.component.css']
})
export class Adm003Component implements OnInit {
  employeeDetail: any;
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) { }
  ngOnInit(): void {
    this.loadEmployee();
  }

  loadEmployee() {
    const state = history.state;

    if (state && state.data) {
      console.log('User ID:', state.data.id);
      this.getDetailEmployee(state.data.id)
    } else {
      console.log('No data passed in state');
    }
  }

  getDetailEmployee (id: number) {
    this.employeeService.getById(id).subscribe({
      next: (response) => {
        // console.log(response);
        if(response.code == "200") {
          this.employeeDetail = response;

          // console.log(this.employeeDetail);
          
        } else {
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

  onClickEditButton(id: number) {
    const data = { id: id };
    this.router.navigate(['/user/adm004'], { state: { data: data } });
  }

  onClickDeleteButton() {

  }
}
