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
  bsValue: Date = new Date();
  
  constructor(private route: ActivatedRoute, 
    private departmentService: DepartmentService, 
    private certificationService: CertificationService,
    private fb: FormBuilder) {

      this.form = this.fb.group({
        employeeName: ['', [Validators.required, Validators.maxLength(125)]],
        employeeBirthDate: ['', [Validators.required]],
        employeeEmail: ['', [Validators.required, Validators.maxLength(125)]],
        employeeTelephone: ['', [Validators.required, Validators.maxLength(50)]],
        employeeNameKana: ['', [Validators.required, Validators.maxLength(125)]],
        employeeLoginId: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^(?![0-9])[a-zA-Z0-9_]*$/)]],
        employeeLoginPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
        employeeLoginConfirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
        departmentId: ['', [Validators.required]],
        certificationId: [''],
        startDate: [''],
        endDate: [''],
        score: [''],
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
    console.log(this.form);
  }
}
