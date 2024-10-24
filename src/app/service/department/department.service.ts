import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Injectable({
  providedIn: 'root'
})
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
