/**
 * Copyright(C) 2024  Luvina
 * Adm004Component.ts, 10/10/2024 AnhNLT
 */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Certification } from 'src/app/model/certification';
import { Department } from 'src/app/model/department';
import { ErrorMessages } from 'src/app/model/errorMessages';
import { CertificationService } from 'src/app/service/certification/certification.service';
import { DepartmentService } from 'src/app/service/department/department.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';

@Component({
  selector: 'app-adm004',
  templateUrl: './adm004.component.html',
  styleUrls: ['./adm004.component.css']
})

/**
 * Component xử lý các chức năng của màn hình ADM004
 */
export class Adm004Component implements OnInit {
  id: string = '';
  departments: Department[] = [];
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
    private departmentService: DepartmentService,
    private certificationService: CertificationService,
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
  ) {
    this.form = this.fb.group({
      employeeId: [''],
      employeeName: ['', [Validators.required, Validators.maxLength(125)]],
      employeeBirthDate: ['', [Validators.required]],
      employeeEmail: ['', [Validators.required, Validators.maxLength(125), Validators.pattern(/^[\x00-\x7F]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)]],
      employeeTelephone: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[0-9]*$/)]],
      employeeNameKana: ['', [Validators.required, Validators.maxLength(125), Validators.pattern(/^[\u30A0-\u30FF\uFF65-\uFF9F・]+$/), this.validateKanaHalfSize]],
      employeeLoginId: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^(?![0-9])[a-zA-Z0-9_]*$/)]],
      employeeLoginPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      employeeLoginConfirmPassword: ['', [Validators.required]],
      departmentId: ['', [Validators.required]],
      departmentName: [''],
      certifications: this.fb.array([this.fb.group({
        certificationId: [''],
        certificationName: [''],
        startDate: [{ value: '', disabled: true }],
        endDate: [{ value: '', disabled: true }],
        score: [{ value: '', disabled: true }]
      })]),
    }, {
      validators: [this.passwordMatchValidator, this.dateOrderValidator],
    });

    this.form.valueChanges.subscribe(() => {
      this.validateForm();
    });
  }

  @ViewChild('firstInput')
  firstInputElement!: ElementRef;

  ngOnInit(): void {
    this.getDepartments();
    this.getCertifications();
    this.loadEmployee();
  }

  ngAfterViewInit(): void {
    // Focus vào phần tử đầu tiên sau khi view được khởi tạo
    this.firstInputElement.nativeElement.focus();
  }

  /**
   * Lấy danh sách department
   */
  getDepartments() {
    this.departmentService.getAll().subscribe({
      next: (response) => {
        // console.log(response);
        if (response.code == "200") {
          this.departments = response.departments;
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
   * Lấy danh sách certification
   */
  getCertifications() {
    this.certificationService.getAll().subscribe({
      next: (response) => {
        // console.log(response);
        if (response.code == "200") {
          this.certifications = response.certifications;
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
  * Hiển thị thông tin employee (nếu có)
  */
  loadEmployee() {
    const value = sessionStorage.getItem("employee");

    if (value) {
      let employee = JSON.parse(value);

      this.setFormValue(employee);

      sessionStorage.removeItem("employee");

      if (this.form.get('employeeId')?.value) {
        this.onPasswordAndConfirmPasswordChange();
      }

      // console.log(this.form.value);

    } else {
      const state = history.state;
      if (state && state.data) {
        // console.log('User ID:', state.data.id);
        this.getDetailEmployee(state.data.id);
        this.onPasswordAndConfirmPasswordChange();
      } else {
        console.log('No data passed in state');
      }
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
        if (response.code == "200") {
          this.setFormValue(response);
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
   * Set giá trị cho form
   * @param employee Thông tin employee
   */
  setFormValue(employee: any) {

    this.form.patchValue({
      employeeId: employee.employeeId,
      employeeName: employee.employeeName,
      employeeBirthDate: new Date(employee.employeeBirthDate) ? new Date(employee.employeeBirthDate) : '',
      employeeEmail: employee.employeeEmail,
      employeeTelephone: employee.employeeTelephone,
      employeeNameKana: employee.employeeNameKana,
      employeeLoginId: employee.employeeLoginId,
      employeeLoginPassword: employee.employeeLoginPassword ? employee.employeeLoginPassword : '',
      employeeLoginConfirmPassword: employee.employeeLoginPassword ? employee.employeeLoginPassword : '',
      departmentId: employee.departmentId,
      departmentName: employee.departmentName,
    });

    const certificationInfo = employee.certifications[0];
    if (certificationInfo) {
      let startDate = new Date(certificationInfo.startDate) ? new Date(certificationInfo.startDate) : '';
      let endDate = new Date(certificationInfo.endDate) ? new Date(certificationInfo.endDate) : '';

      this.form.patchValue({
        certifications: [{
          certificationId: certificationInfo.certificationId,
          certificationName: certificationInfo.certificationName,
          startDate: startDate,
          endDate: endDate,
          score: certificationInfo.score,
        }]
      });

      this.onCertificationIdChange();
    }
  }

  /**
   * Kiểm tra thông tin employee đã nhập có hợp lệ không
   */
  validateForm() {
    // console.log(this.form);

    if (this.isTouchedAndInvalid('employeeLoginId')) {
      if (this.form.get('employeeLoginId')?.errors?.['required']) {
        this.errorMessage.employeeLoginId = ErrorMessages.ER001('アカウント名');
      } else if (this.form.get('employeeLoginId')?.errors?.['maxlength']) {
        this.errorMessage.employeeLoginId = ErrorMessages.ER006('アカウント名', 50);
      } else if (this.form.get('employeeLoginId')?.errors?.['pattern']) {
        this.errorMessage.employeeLoginId = ErrorMessages.ER019();
      }
    }

    if (this.isTouchedAndInvalid('departmentId')) {
      if (this.form.get('departmentId')?.errors?.['required']) {
        this.errorMessage.departmentId = ErrorMessages.ER002('グループ');
      }
    }

    if (this.isTouchedAndInvalid('employeeName')) {
      if (this.form.get('employeeName')?.errors?.['required']) {
        this.errorMessage.employeeName = ErrorMessages.ER001('氏名');
      } else if (this.form.get('employeeName')?.errors?.['maxlength']) {
        this.errorMessage.employeeName = ErrorMessages.ER006('氏名', 125);
      }
    }

    if (this.isTouchedAndInvalid('employeeNameKana')) {
      if (this.form.get('employeeNameKana')?.errors?.['required']) {
        this.errorMessage.employeeNameKana = ErrorMessages.ER001('カタカナ氏名');
      } else if (this.form.get('employeeNameKana')?.errors?.['maxlength']) {
        this.errorMessage.employeeNameKana = ErrorMessages.ER006('カタカナ氏名', 125);
      } else if (this.form.get('employeeNameKana')?.errors?.['pattern']) {
        this.errorMessage.employeeNameKana = ErrorMessages.ER009('カタカナ氏名');
      } else if (this.form.get('employeeNameKana')?.errors?.['invalidKanaHalfSize']) {
        this.errorMessage.employeeNameKana = ErrorMessages.ER008('カタカナ氏名');
      }
    }

    if (this.isTouchedAndInvalid('employeeBirthDate')) {
      if (this.form.get('employeeBirthDate')?.errors?.['required']) {
        this.errorMessage.employeeBirthDate = ErrorMessages.ER001('生年月日');
      }
    }

    if (this.isTouchedAndInvalid('employeeEmail')) {
      if (this.form.get('employeeEmail')?.errors?.['required']) {
        this.errorMessage.employeeEmail = ErrorMessages.ER001('メールアドレス');
      } else if (this.form.get('employeeEmail')?.errors?.['pattern']) {
        this.errorMessage.employeeEmail = ErrorMessages.ER008('メールアドレス');
      } else if (this.form.get('employeeEmail')?.errors?.['maxlength']) {
        this.errorMessage.employeeEmail = ErrorMessages.ER006('メールアドレス', 125);
      }
    }

    if (this.isTouchedAndInvalid('employeeTelephone')) {
      if (this.form.get('employeeTelephone')?.errors?.['required']) {
        this.errorMessage.employeeTelephone = ErrorMessages.ER001('電話番号');
      } else if (this.form.get('employeeTelephone')?.errors?.['maxlength']) {
        this.errorMessage.employeeTelephone = ErrorMessages.ER006('電話番号', 50);
      } else if (this.form.get('employeeTelephone')?.errors?.['pattern']) {
        this.errorMessage.employeeTelephone = ErrorMessages.ER008('電話番号');
      }
    }

    if (this.isTouchedAndInvalid('employeeLoginPassword')) {
      if (this.form.get('employeeLoginPassword')?.errors?.['required'] && this.form.get('employeeId')?.value == '') {
        this.errorMessage.employeeLoginPassword = ErrorMessages.ER001('パスワード');
      } else if (this.form.get('employeeLoginPassword')?.errors?.['maxlength'] || this.form.get('employeeLoginPassword')?.errors?.['minlength']) {
        this.errorMessage.employeeLoginPassword = ErrorMessages.ER007('パスワード', 8, 50);
      }
    }

    if ((this.isTouchedAndInvalid('employeeLoginConfirmPassword')) ||
      (this.form.get('employeeLoginConfirmPassword') && this.form?.errors?.['passwordMismatch'])) {
      if (this.form.get('employeeLoginConfirmPassword')?.errors?.['required']) {
        this.errorMessage.employeeLoginConfirmPassword = ErrorMessages.ER001('パスワード（確認）');
      } else if (this.form?.errors?.['passwordMismatch']) {
        this.errorMessage.employeeLoginConfirmPassword = ErrorMessages.ER017();
      }
    }

    if (this.isTouchedAndInvalid('certifications.0.startDate')) {
      if (this.form.get('certifications.0.startDate')?.errors?.['required']) {
        this.errorMessage.startDate = ErrorMessages.ER001('資格交付日');
      } else if (this.form?.errors?.['dateInvalid']) {
        this.errorMessage.endDate = ErrorMessages.ER012();
      }
    }

    if ((this.isTouchedAndInvalid('certifications.0.endDate')) ||
      (this.form.get('certifications.0.endDate') && this.form?.errors?.['dateInvalid'])) {
      if (this.form.get('certifications.0.endDate')?.errors?.['required']) {
        this.errorMessage.endDate = ErrorMessages.ER001('失効日');
      } else if (this.form?.errors?.['dateInvalid']) {
        this.errorMessage.endDate = ErrorMessages.ER012();
      }
    }

    if (this.isTouchedAndInvalid('certifications.0.score')) {
      if (this.form.get('certifications.0.score')?.errors?.['required']) {
        this.errorMessage.score = ErrorMessages.ER001('点数');
      } else if (this.form.get('certifications.0.score')?.errors?.['notPositiveInteger']) {
        this.errorMessage.score = ErrorMessages.ER018('点数');
      }
    }
  }

  /**
   * Kiểm tra trường thông tin đã được click vào và không hợp lệ không
   */
  isTouchedAndInvalid(field: string) {
    return this.form.get(field)?.touched && this.form.get(field)?.invalid;
  }

  validateKanaHalfSize(control: AbstractControl): ValidationErrors | null {
    const regexKatakana = /^[\uFF65-\uFF9F・]+$/;
    let nameKana: string = control?.value?.toString() || '';

    return regexKatakana.test(nameKana) ? null : { invalidKanaHalfSize: true };
  }

  /**
   * Kiểm tra trường password và confirmPassword có trùng khớp hay không
   */
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('employeeLoginPassword')?.value;
    const confirmPassword = control.get('employeeLoginConfirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  /**
   * Kiểm tra trường startDate và endDate có hợp lệ không
   */
  dateOrderValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('certifications.0.startDate')?.value;
    const endDate = control.get('certifications.0.endDate')?.value;

    const start = new Date(startDate);
    const end = new Date(endDate);

    return end < start ? { dateInvalid: true } : null;
  }

  /**
   * Kiểm tra giá trị có phải số nguyên dương không
   */
  positiveIntegerValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value) {
      const isPositiveInteger = Number.isInteger(Number.parseInt(value)) && value > 0;
      return isPositiveInteger ? null : { notPositiveInteger: true };
    }

    return null;
  }

  /**
   * Xử lí khi chọn certificationId và không chọn certificationId
   */
  onCertificationIdChange() {
    const control = this.form.get('certifications.0');
    if (control?.get('certificationId')?.value) {
      control?.get('startDate')?.enable();
      control?.get('endDate')?.enable();
      control?.get('score')?.enable();
      control?.get('startDate')?.setValidators(Validators.required);
      control?.get('endDate')?.setValidators(Validators.required);
      control?.get('score')?.setValidators([Validators.required, this.positiveIntegerValidator]);
    } else {
      control?.get('startDate')?.disable();
      control?.get('endDate')?.disable();
      control?.get('score')?.disable();
      control?.get('startDate')?.clearValidators();
      control?.get('endDate')?.clearValidators();
      control?.get('score')?.clearValidators();
      control?.get('startDate')?.reset();
      control?.get('endDate')?.reset();
      control?.get('score')?.reset();
    }
    control?.get('startDate')?.updateValueAndValidity();
    control?.get('endDate')?.updateValueAndValidity();
    control?.get('score')?.updateValueAndValidity();
  }

  /**
   * Xử lí khi nhập employeeLoginPassword và employeeLoginConfirmPassword
   */
  onPasswordAndConfirmPasswordChange() {
    this.form.get('employeeLoginPassword')?.clearValidators();
    this.form.get('employeeLoginConfirmPassword')?.clearValidators();
    this.form.get('employeeLoginPassword')?.setValidators([Validators.minLength(8), Validators.maxLength(50)]);
    this.form.get('employeeLoginPassword')?.updateValueAndValidity();
    this.form.get('employeeLoginConfirmPassword')?.updateValueAndValidity();

    // console.log(this.form.get('employeeLoginPassword')?.validator?.toString());
  }

  /**
   * Xử lí khi submit form
   */
  submit() {
    if (this.form.valid) {
      this.form.value.departmentName = '';
      this.form.value.certifications[0].certificationName = '';

      this.departments.forEach((value) => {
        if (value.departmentId == this.form.value.departmentId) {
          this.form.value.departmentName = value.departmentName;
        }
      });

      this.certifications.forEach((value) => {
        if (value.certificationId == this.form.value.certifications[0].certificationId) {
          this.form.value.certifications[0].certificationName = value.certificationName;
        }
      });

      // console.log(this.form.value);

      sessionStorage.setItem("employee", JSON.stringify(this.form.value));
      this.router.navigate(['user/adm005']);
    } else {
      // Mark all fields as touched to show validation errors
      this.form.markAllAsTouched();
    }
  }

  /**
   * Quay lại màn hình ADM003 khi đang ở mode edit
   * Quay lại màn hình ADM002 khi đang ở mode add
   */
  returnBtn() {
    if(this.form.get('employeeId')?.value) {
      const data = { id: this.form.get('employeeId')?.value };
      this.router.navigate(['/user/adm003'], { state: { data: data } });
    } else {
      this.router.navigate(['/user/list']);
    }
  }
}
