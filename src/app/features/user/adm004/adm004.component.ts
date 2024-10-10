import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Certification } from 'src/app/model/certification';
import { Deaprtment } from 'src/app/model/department';
import { CertificationService } from 'src/app/shared/service/certification/certification.service';
import { DepartmentService } from 'src/app/shared/service/department/department.service';

@Component({
  selector: 'app-adm004',
  templateUrl: './adm004.component.html',
  styleUrls: ['./adm004.component.css']
})
export class Adm004Component implements OnInit {
  id: string = '';
  departments: Deaprtment[] = [];
  certifications: Certification[] = [];
  form: FormGroup<any>;
  
  constructor(private route: ActivatedRoute, 
    private departmentService: DepartmentService, 
    private certificationService: CertificationService,
    private fb: FormBuilder) {
      this.form = this.fb.group({
        employeeName: [''],
        employeeBirthDate: [''],
        employeeEmail: [''],
        employeeTelephone: [''],
        employeeNameKana: [''],
        employeeLoginId: [''],
        employeeLoginPassword: [''],
        departmentId: [''],
        certifications: [],
      });
  }

  ngOnInit(): void {
    this.getDepartments();
    this.getCertifications();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // Làm gì đó với id
    });
  }

  getDepartments() {
    this.departmentService.getAll().subscribe({
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

  getCertifications() {
    this.certificationService.getAll().subscribe({
      next: (response) => {
        console.log(response);
        this.certifications = response.certifications;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  submit() {

  }
}
