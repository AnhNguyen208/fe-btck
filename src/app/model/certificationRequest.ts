/**
 * Copyright(C) 2024  Luvina
 * certificationRequest.ts, 18/10/2024 AnhNLT
 */

/**
 * Thông tin về certificationRequest khi thêm mới employee
 */

export interface CertificationRequest {
    certificationId: string;
    certificationStartDate: string;
    certificationEndDate: string;
    employeeCertificationScore: string;
}