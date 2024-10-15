import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Certification } from 'src/app/model/certification';
import { Deaprtment } from 'src/app/model/department';
import { ErrorMessages } from 'src/app/model/error-messages';
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
  errorMessage: any = {
    employeeName: '',
    employeeBirthDate: '',
    employeeEmail: '',
    employeeTelephone: '',
    employeeNameKana: '',
    employeeLoginId: '',
    employeeLoginPassword: '',
    employeeLoginConfirmPassword: '',
    departmentId: '',
    certificationId: '',
    startDate: '',
    endDate: '',
    score: '',

  };

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
      employeeTelephone: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[\x00-\x7F]*$/)]],
      employeeNameKana: ['', [Validators.required, Validators.maxLength(125), Validators.pattern(/^[ァ-ヶー・]+$/)]],
      employeeLoginId: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^(?![0-9])[a-zA-Z0-9_]*$/)]],
      employeeLoginPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      employeeLoginConfirmPassword: ['', [Validators.required]],
      departmentId: ['', [Validators.required]],
      departmentName: [''],
      certificationId: [''],
      certificationName: [''],
      startDate: [{ value: '', disabled: true }],
      endDate: [{ value: '', disabled: true }],
      score: [{ value: '', disabled: true }],
    }, {
      validators: [this.passwordMatchValidator, this.dateOrderValidator],
    });

    this.form.valueChanges.subscribe(() => {
      this.validateForm();
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
        // console.log(response);
        this.departments = response.departments;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        // console.log('complete');
      }
    });
  }

  getCertifications() {
    this.certificationService.getAll().subscribe({
      next: (response) => {
        // console.log(response);
        this.certifications = response.certifications;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        // console.log('complete');
      }
    });
  }

  loadEmployee() {
    const value = sessionStorage.getItem("employee");

    if (value) {
      let employee = JSON.parse(value);

      this.form.setValue({
        employeeName: employee.employeeName,
        employeeBirthDate: new Date(employee.employeeBirthDate) ? new Date(employee.employeeBirthDate) : '',
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
        startDate: new Date(employee.startDate) ? new Date(employee.startDate) : '',
        endDate: new Date(employee.endDate) ? new Date(employee.endDate) : '',
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

  validateForm() {
    // console.log(this.form);

    if (this.isTouchedAndInvalid('employeeLoginId')) {
      this.validateField('employeeLoginId',
        ErrorMessages.ER001_EMPLOYEE_LOGIN_ID, ErrorMessages.ER006_EMPLOYEE_LOGIN_ID,
        ErrorMessages.ER019_EMPLOYEE_LOGIN_ID, '', '','', ''
      );
    }

    if (this.isTouchedAndInvalid('departmentId')) {
      this.validateField('departmentId',
        ErrorMessages.ER002_DEPARTMENT_ID, '', '', '', '', '', ''
      );
    }

    if (this.isTouchedAndInvalid('employeeName')) {
      this.validateField('employeeName',
        ErrorMessages.ER001_EMPLOYEE_NAME, ErrorMessages.ER006_EMPLOYEE_NAME,
        '', '', '', '', ''
      );
    }

    if (this.isTouchedAndInvalid('employeeNameKana')) {
      this.validateField('employeeNameKana',
        ErrorMessages.ER001_EMPLOYEE_NAME_KANA, ErrorMessages.ER006_EMPLOYEE_NAME_KANA,
        ErrorMessages.ER009_EMPLOYEE_NAME_KANA, '', '', '', ''
      );
    }

    if (this.isTouchedAndInvalid('employeeBirthDate')) {
      this.validateField('employeeBirthDate',
        ErrorMessages.ER001_EMPLOYEE_BIRTHDATE, '', '', '', '', '', ''
      );
    }

    if (this.isTouchedAndInvalid('employeeEmail')) {
      this.validateField('employeeEmail',
        ErrorMessages.ER001_EMPLOYEE_EMAIL, ErrorMessages.ER006_EMPLOYEE_EMAIL,
        '', '', '', '', ''
      );
    }

    if (this.isTouchedAndInvalid('employeeTelephone')) {
      this.validateField('employeeTelephone',
        ErrorMessages.ER001_EMPLOYEE_TELEPHONE, ErrorMessages.ER006_EMPLOYEE_TELEPHONE,
        ErrorMessages.ER008_EMPLOYEE_TELEPHONE, '', '', '', ''
      );
    }

    if (this.isTouchedAndInvalid('employeeLoginPassword')) {
      this.validateField('employeeLoginPassword',
        ErrorMessages.ER001_EMPLOYEE_LOGIN_PASSWORD, '', '', 
        ErrorMessages.ER007_EMPLOYEE_LOGIN_PASSWORD, '', '', ''
      );
    }

    if (this.isTouchedAndInvalid('employeeLoginConfirmPassword') ||
      (this.form.get('employeeLoginConfirmPassword') && this.form?.errors?.['passwordMismatch'])) {
      this.validateField('employeeLoginConfirmPassword',
        ErrorMessages.ER001_EMPLOYEE_LOGIN_PASSWORD, '', '', '', 
        "パスワード và パスワードの確認 không khớp", '', ''
      );
    }

    if (this.isTouchedAndInvalid('startDate')) {
      this.validateField('startDate',
        ErrorMessages.ER001_CERTIFICATION_START_DATE, '', '', '', '', '', ''
      );
    }

    if (this.isTouchedAndInvalid('endDate') ||
      (this.form.get('endDate') && this.form?.errors?.['dateInvalid'])) {
      this.validateField('endDate',
        ErrorMessages.ER001_CERTIFICATION_END_DATE, '', '', '', '',
        ErrorMessages.ER012_CERTIFICATION_START_DATE_END_DATE, ''
      );
    }

    if (this.isTouchedAndInvalid('score')) {
      this.validateField('score',
        ErrorMessages.ER001_CERTIFICATION_SCORE, '', '', '', '', '', 
        ErrorMessages.ER018_CERTIFICATION_SCORE
      );
    }
  }

  isTouchedAndInvalid(field: string) {
    return this.form.get(field)?.touched && this.form.get(field)?.invalid;
  }

  validateField(field: string, error1: string, error2: string, error3: string, error4: string, error5: string, error6: string, error7: string) {
    if (this.form.get(field)?.errors?.['required'] && error1) {
      this.errorMessage[field] = error1;
    } else if ((this.form.get(field)?.errors?.['maxlength'] || this.form.get(field)?.errors?.['minlength']) && error4) {
      this.errorMessage[field] = error4;
    } else if (this.form.get(field)?.errors?.['maxlength'] && error2) {
      this.errorMessage[field] = error2;
    } else if (this.form.get(field)?.errors?.['pattern'] && error3) {
      this.errorMessage[field] = error3;
    } else if (this.form?.errors?.['passwordMismatch'] && error5) {
      this.errorMessage[field] = error5;
    } else if (this.form?.errors?.['dateInvalid'] && error6) {
      this.errorMessage[field] = error6;
    } else if (this.form.get(field)?.errors?.['notPositiveInteger'] && error7) {
      this.errorMessage[field] = error7;
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('employeeLoginPassword')?.value;
    const confirmPassword = control.get('employeeLoginConfirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  dateOrderValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    const start = new Date(startDate);
    const end = new Date(endDate);

    return end < start ? { dateInvalid: true } : null;
  }

  positiveIntegerValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value) {
      const isPositiveInteger = Number.isInteger(Number.parseInt(value)) && value > 0;
      return isPositiveInteger ? null : { notPositiveInteger: true };
    }

    return null;
  }

  onCertificationIdChange() {
    if (this.form.get('certificationId')?.value) {
      this.form.get('startDate')?.enable();
      this.form.get('endDate')?.enable();
      this.form.get('score')?.enable();
      this.form.get('startDate')?.setValidators(Validators.required);
      this.form.get('endDate')?.setValidators(Validators.required);
      this.form.get('score')?.setValidators([Validators.required, this.positiveIntegerValidator]);
    } else {
      this.form.get('startDate')?.disable();
      this.form.get('endDate')?.disable();
      this.form.get('score')?.disable();
      this.form.get('startDate')?.clearValidators();
      this.form.get('endDate')?.clearValidators();
      this.form.get('score')?.clearValidators();
      this.form.get('startDate')?.reset();
      this.form.get('endDate')?.reset();
      this.form.get('score')?.reset();
    }
    this.form.get('startDate')?.updateValueAndValidity();
    this.form.get('endDate')?.updateValueAndValidity();
    this.form.get('score')?.updateValueAndValidity();
  }

  submit() {
    if (this.form.valid) {
      this.departments.forEach((value) => {
        if (value.departmentId == this.form.value.departmentId) {
          this.form.value.departmentName = value.departmentName;
        }
      });

      this.certifications.forEach((value) => {
        if (value.certificationId == this.form.value.certificationId) {
          this.form.value.certificationName = value.certificationName;
        }
      });

      sessionStorage.setItem("employee", JSON.stringify(this.form.value));
      this.router.navigate(['/user/adm005']);
    } else {
      // Mark all fields as touched to show validation errors
      this.form.markAllAsTouched();
    }
  }
}
