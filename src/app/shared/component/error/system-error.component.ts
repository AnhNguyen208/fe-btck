import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMessages } from 'src/app/model/errorMessages';

@Component({
  selector: 'app-system-error',
  templateUrl: './system-error.component.html',
})
export class SystemErrorComponent implements OnInit{
  message: string = ErrorMessages.ER022();

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    const state = history.state;

    if (state && state.message) {
        this.message = state.message;
      } else {
        console.log('No data passed in state');
      }
  }
  
  handleOnClick() {
    const accessToken = sessionStorage.getItem("access_token");

    if (accessToken) {
      this.router.navigate(['user/list']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
