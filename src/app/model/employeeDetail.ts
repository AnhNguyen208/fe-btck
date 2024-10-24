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

