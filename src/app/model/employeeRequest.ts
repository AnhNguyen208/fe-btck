import { CertificationRequest } from "./certificationRequest";

export interface EmployeeRequest {
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