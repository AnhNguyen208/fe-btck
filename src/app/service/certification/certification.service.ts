import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {
  private apiUrl = AppConstants.BASE_URL_API + '/certifications';

  constructor(private http: HttpClient) { }

  /**
   * Gọi Api ListCertifications 
   * @returns List certifications
   */
  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
