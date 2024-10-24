import { CertificationRequest } from "./certificationRequest";

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