/**
 * Copyright(C) 2024  Luvina
 * DepartmentService.ts, 04/10/2024 AnhNLT
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Injectable({
  providedIn: 'root'
})

/**
 * Xử lý các yêu cầu liên quan đến department
 */
export class DepartmentService {
  private apiUrl = AppConstants.BASE_URL_API + '/departments';

  constructor(private http: HttpClient) { }

  /**
   * Gọi Api ListDepartments 
   * @returns List departments
   */
  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
