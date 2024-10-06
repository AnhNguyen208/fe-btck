import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = AppConstants.BASE_URL_API + '/employees';

  constructor(private http: HttpClient) { }

  getAll(employee_name: string,
    department_id: string, ord_employee_name: string,
    ord_certification_name: string, ord_end_date: string,
    offset: number, limit: number) {
      return this.http.get<any>(
        `${this.apiUrl}?employee_name=${employee_name}&` +
         `department_id=${department_id}&ord_employee_name=${ord_employee_name}` + 
         `&ord_certification_name=${ord_certification_name}&ord_end_date=${ord_end_date}&`+
         `offset=${offset}&limit=${limit}` 
      );
  }
}
