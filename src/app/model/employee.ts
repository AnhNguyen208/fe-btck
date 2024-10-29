/**
 * Copyright(C) 2024  Luvina
 * employee.ts, 06/10/2024 AnhNLT
 */

/**
 * Thông tin về employee trong màn hình ADM002
 */
export class Employee {
    employeeId: number;
    employeeName: string;
    employeeBirthDate: Date;
    departmentName: string;
    employeeEmail: string;
    employeeTelephone: string;
    certificationName: string;
    endDate: Date;
    score: number;

    constructor( employeeId: number,
        employeeName: string,
        employeeBirthDate: Date,
        departmentName: string,
        employeeEmail: string,
        employeeTelephone: string,
        certificationName: string,
        endDate: Date,
        score: number) {
            this.employeeId = employeeId;
            this.employeeName = employeeName;
            this.employeeBirthDate = employeeBirthDate;
            this.departmentName = departmentName;
            this.employeeEmail = employeeEmail;
            this.employeeTelephone = employeeTelephone;
            this.certificationName = certificationName;
            this.endDate = endDate;
            this.score = score; 
        }
} 