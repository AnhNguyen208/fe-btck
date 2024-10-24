export enum ErrorMessages {
    // 1.1 Validate parameter [employeeLoginId]
    ER001_EMPLOYEE_LOGIN_ID = "「アカウント名」を入力してください。",
    ER006_EMPLOYEE_LOGIN_ID = "50桁以内の「アカウント名」を入力してください。",
    ER019_EMPLOYEE_LOGIN_ID = "「アカウント名」は(a-z, A-Z, 0-9 と _)の桁のみです。最初の桁は数字ではない。",
    ER003_EMPLOYEE_LOGIN_ID = "「アカウント名」は存在していません。",

    // 1.2 Validate parameter [employeeName]
    ER001_EMPLOYEE_NAME = "「氏名」を入力してください。",
    ER006_EMPLOYEE_NAME = "125桁以内の「氏名」を入力してください。",

    // 1.3 Validate parameter [employeeNameKana]
    ER001_EMPLOYEE_NAME_KANA = "「カタカナ氏名」を入力してください。",
    ER006_EMPLOYEE_NAME_KANA = "125桁以内の「カタカナ氏名」を入力してください。",
    ER009_EMPLOYEE_NAME_KANA = "「カタカナ氏名」をカタカナで入力してください。",

    // 1.4 Validate parameter [employeeBirthDate]
    ER001_EMPLOYEE_BIRTHDATE = "「生年月日」を入力してください。",
    ER005_EMPLOYEE_BIRTHDATE = "「生年月日」をyyyy/MM/dd形式で入力してください。",
    ER011_EMPLOYEE_BIRTHDATE = "「生年月日」は無効になっています。",

    // 1.5 Validate parameter [employeeEmail]
    ER001_EMPLOYEE_EMAIL = "「メールアドレス」を入力してください。",
    ER006_EMPLOYEE_EMAIL = "125桁以内の「メールアドレス」を入力してください。",
    ER005_EMPLOYEE_EMAIL = "「メールアドレス」をhalfsize形式で入力してください",
    ER005_EMPLOYEE_EMAIL_FORMAT = "「メールアドレス」をemail(@.)形式で入力してください",

    // 1.6 Validate parameter [employeeTelephone]
    ER001_EMPLOYEE_TELEPHONE = "「電話番号」を入力してください。",
    ER006_EMPLOYEE_TELEPHONE = "50桁以内の「電話番号」を入力してください。",
    ER008_EMPLOYEE_TELEPHONE = "「電話番号」は無効になっています。",

    // 1.7 Validate parameter [employeeLoginPassword]
    ER001_EMPLOYEE_LOGIN_PASSWORD = "「パスワード」を入力してください。",
    ER007_EMPLOYEE_LOGIN_PASSWORD = "「パスワード」を8<=桁数、<=50桁で入力してください。",

    // 1.8 Validate parameter [departmentId]
    ER002_DEPARTMENT_ID = "「グループ」を入力してください。",
    ER004_DEPARTMENT_ID = "「グループ」は存在していません。",
    ER018_DEPARTMENT_ID = "「グループ」は半角で入力してください。",

    // 1.9 Validate parameter [certifications]
    ER001_CERTIFICATION_START_DATE = "「資格交付日」を入力してください。",
    ER001_CERTIFICATION_END_DATE = "「失効日」を入力してください。",
    ER001_CERTIFICATION_SCORE = "「点数」を入力してください。",
    ER001_CERTIFICATION_ID = "「資格」を入力してください。",
    ER004_CERTIFICATION_ID = "「資格」は存在していません。",
    ER005_CERTIFICATION_START_DATE = "「資格交付日」をyyyy/MM/dd形式で入力してください。",
    ER005_CERTIFICATION_END_DATE = "「失効日」をyyyy/MM/dd形式で入力してください。",
    ER012_CERTIFICATION_START_DATE_END_DATE = "「失効日」は「資格交付日」より未来の日で入力してください。",
    ER018_CERTIFICATION_SCORE = "「点数」は半角で入力してください。",
    ER018_CERTIFICATION_ID = "「資格」は半角で入力してください。",

    // 1.10 Validate parameter [employeeId]
    ER001_EMPLOYEE_ID = "「ID」を入力してください。",
    ER013_EMPLOYEE_ID = "該当するユーザは存在していません。",
    ER014_EMPLOYEE_ID = "該当するユーザは存在していません。",

    // System error
    ER023 = "システムエラーが発生しました。",

    // Validate confirm password
    ER001_EMPLOYEE_LOGIN_CONFIRM_PASSWORD = "「パスワード（確認）」を入力してください。",
    ER017_EMPLOYEE_LOGIN_CONFIRM_PASSWORD = "「パスワード（確認）」が不正です。",
}

export enum Message {
    CONFIRM_MESSSAGE = "削除しますが、よろしいでしょうか。",
    ADD_SUCCESS = "ユーザの登録が完了しました。",
    EDIT_SUCCESS = "ユーザの更新が完了しました。",
    DELETE_SUCCESS = "ユーザの削除が完了しました。",
}