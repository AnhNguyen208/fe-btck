import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adm005',
  templateUrl: './adm005.component.html',
  styleUrls: ['./adm005.component.css']
})
export class Adm005Component implements OnInit{
  form: FormGroup<any>;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.loadEmployee();
  }

  loadEmployee() {
    const value = sessionStorage.getItem("employee");
    if(value) {
      this.form = this.fb.group(JSON.parse(value));
      console.log(this.form.value);
    }
  }

  submit() {

  }

}
