import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';
import { EmployeeRequest } from 'src/app/model/employeeRequest';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = AppConstants.BASE_URL_API + '/employee';

  constructor(private http: HttpClient) { }

  getAll(
    employee_name: string,
    department_id: string,
    ord_employee_name: string,
    ord_certification_name: string,
    ord_end_date: string,
    offset: number,
    limit: number): Observable<any> {
    let params = new HttpParams();

    if (employee_name) {
      params = params.set('employee_name', employee_name);
    }

    if (department_id) {
      params = params.set('department_id', department_id);
    }

    if (ord_employee_name) {
      params = params.set('ord_employee_name', ord_employee_name);
    }

    if (ord_certification_name) {
      params = params.set('ord_certification_name', ord_certification_name);
    }

    if (ord_end_date) {
      params = params.set('ord_end_date', ord_end_date);
    }

    if (offset) {
      params = params.set('offset', offset);
    }

    if (limit) {
      params = params.set('limit', limit);
    }

    return this.http.get<any>(this.apiUrl, { params });
  }

  add(request: EmployeeRequest): Observable<any> {

    return this.http.post<any>(this.apiUrl, request);
  }

  getById(id: number) {

    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }
}
