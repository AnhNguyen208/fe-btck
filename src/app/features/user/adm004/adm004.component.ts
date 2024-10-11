import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Certification } from 'src/app/model/certification';
import { Deaprtment } from 'src/app/model/department';
import { CertificationService } from 'src/app/service/certification/certification.service';
import { DepartmentService } from 'src/app/service/department/department.service';

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
  
  constructor(
    private activeRoute: ActivatedRoute, 
    private departmentService: DepartmentService, 
    private certificationService: CertificationService,
    private fb: FormBuilder, 
    private router: Router
  ) {
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
        departmentName: [''],
        certificationId: [''],
        certificationName: [''],
        startDate: [''],
        endDate: [''],
        score: [''],
      });
  }

  ngOnInit(): void {
    this.getDepartments();
    this.getCertifications();
    this.loadEmployee();
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

  loadEmployee() {
    const value = sessionStorage.getItem("employee");
   
    if(value) {
      let employee = JSON.parse(value);

      this.form.setValue({
        employeeName: employee.employeeName,
        employeeBirthDate: new Date(employee.employeeBirthDate),
        employeeEmail: employee.employeeEmail,
        employeeTelephone: employee.employeeTelephone,
        employeeNameKana: employee.employeeNameKana,
        employeeLoginId: employee.employeeLoginId,
        employeeLoginPassword: employee.employeeLoginPassword,
        employeeLoginConfirmPassword: employee.employeeLoginPassword,
        departmentId: employee.departmentId,
        departmentName: employee.departmentName,
        certificationId: employee.certificationId,
        certificationName: employee.certificationName,
        startDate: new Date(employee.startDate),
        endDate: new Date(employee.endDate),
        score: employee.score
      });

      sessionStorage.removeItem("employee");

      console.log(this.form.value);
      
    } else {
      this.activeRoute.params.subscribe(params => {
        this.id = params['id'];
        // Làm gì đó với id
      });
    }
   
  }

  submit() {
    // if (this.form.valid) {
    //   this.router.navigate(['/user/adm005']);
    // } else {
    //   // Mark all fields as touched to show validation errors
    //   this.form.markAllAsTouched();
    // }

    this.departments.forEach((value) => {
      if(value.departmentId == this.form.value.departmentId) {
        this.form.value.departmentName = value.departmentName;
      }
    });

    this.certifications.forEach((value) => {
      if(value.certificationId == this.form.value.certificationId) {
        this.form.value.certificationName = value.certificationName;
      }
    });

    sessionStorage.setItem("employee", JSON.stringify(this.form.value));
    this.router.navigate(['/user/adm005']);

  }
}
