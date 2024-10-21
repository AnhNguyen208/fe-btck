import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adm006',
  templateUrl: './adm006.component.html',
  styleUrls: ['./adm006.component.css']
})
export class Adm006Component implements OnInit {
  message: string = '';

  ngOnInit(): void {
    const state = history.state;

      if (state && state.data) {
        this.message = state.data.message;
      } else {
        console.log('No data passed in state');
      }
  }
  
}
