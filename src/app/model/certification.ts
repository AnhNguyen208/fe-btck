/**
 * Copyright(C) 2024  Luvina
 * certification.ts, 10/10/2024 AnhNLT
 */

/**
 * Thông tin về certification
 */
export class Certification {
    certificationId: number;
    certificationName: string;

    constructor(id: number, name: string) {
        this.certificationId = id;
        this.certificationName = name;
    }
}