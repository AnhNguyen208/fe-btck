/**
 * Copyright(C) 2024  Luvina
 * Adm006Component.ts, 18/10/2024 AnhNLT
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adm006',
  templateUrl: './adm006.component.html',
  styleUrls: ['./adm006.component.css']
})

/**
 * Component xử lý các chức năng của màn hình ADM006
 */
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
