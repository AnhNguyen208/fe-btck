/**
 * Copyright(C) 2024  Luvina
 * employeeDetail.ts, 21/10/2024 AnhNLT
 */

/**
 * Thông tin chi tiết về employee
 */
export interface EmployeeDetail {
    employeeId: number;
    employeeName: string;
    employeeBirthDate: Date;
    departmentId: number;
    departmentName: string;
    employeeEmail: string;
    employeeTelephone: string;
    employeeNameKana: string;
    employeeLoginId: string;
    certifications: EmployeeCertification[];
} 

export interface EmployeeCertification {
    certificationId: number;
    certificationName: number;
    startDate: Date;
    endDate: Date;
    score: number;    
} 

