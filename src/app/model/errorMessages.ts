/**
 * Copyright(C) 2024  Luvina
 * errorMessages.ts, 29/10/2024 AnhNLT
 */

/**
 * Danh sách các mã lỗi và thông báo lỗi
 */
export const ErrorMessages = {
    ER001: (field: string) => `「${field}」を入力してください。`,
    ER002: (field: string) => `「${field}」を入力してください。`,
    ER003: (field: string) => `「${field}」は既に存在しています。`,
    ER004: (field: string) => `「${field}」は存在していません。`,
    ER005: (field: string, type: string) => `「${field}」を${type}形式で入力してください。`,
    ER006: (field: string, maxLength: Number) => `${maxLength}桁以内の「${field}」を入力してください。`,
    ER007: (field: string, minLength: number, maxLength: number) => `「${field}」を${minLength}＜＝桁数、＜＝${maxLength}桁で入力してください。`,
    ER008: (field: string) => `「${field}」に半角英数を入力してください。`,
    ER009: (field: string) => `「${field}」をカタカナで入力してください。`,
    ER010: (field: string) => `「${field}」をひらがなで入力してください。`,
    ER011: (field: string) => `「${field}」は無効になっています。`,
    ER012: () => `「失効日」は「資格交付日」より未来の日で入力してください。`,
    ER013: () => `該当するユーザは存在していません。`,
    ER014: () => `該当するユーザは存在していません。`,
    ER015: () => `システムエラーが発生しました。`,
    ER016: () => `「アカウント名」または「パスワード」は不正です。`,
    ER017: () => `「パスワード（確認）」が不正です。`,
    ER018: (field: string) => `「${field}」は半角で入力してください。`,
    ER019: () => `[アカウント名]は(a-z, A-Z, 0-9 と _)の桁のみです。最初の桁は数字ではない。`,
    ER020: () => `管理者ユーザを削除することはできません。`,
    ER021: () => `ソートは (ASC, DESC) でなければなりません。`,
    ER022: () => `ページが見つかりません。`,
    ER023: () => `システムエラーが発生しました。`,
}