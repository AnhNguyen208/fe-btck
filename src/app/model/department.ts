/**
 * Copyright(C) 2024  Luvina
 * department.ts, 06/10/2024 AnhNLT
 */

/**
 * Thông tin về department
 */
export class Department {
    departmentId: number;
    departmentName: string;

    constructor(id: number, name: string) {
        this.departmentId = id;
        this.departmentName = name;
    }
}