/**
 * Copyright(C) 2024  Luvina
 * employeeRequest.ts, 23/10/2024 AnhNLT
 */

import { CertificationRequest } from "./certificationRequest";


/**
 * Thông tin về employee khi thêm mới
 */
export interface EmployeeRequest {
  employeeId?: string;
  employeeName: string;
  employeeBirthDate: string;
  employeeEmail: string;
  employeeTelephone: string;
  employeeNameKana: string;
  employeeLoginId: string;
  employeeLoginPassword: string;
  departmentId: string;
  certifications?: CertificationRequest[];
}