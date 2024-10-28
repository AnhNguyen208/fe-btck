import { Injectable } from '@angular/core';
import { ErrorMessages, MessageCode } from '../../model/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  getMessages(code: string, params: string): string {
    switch (code) {
      case MessageCode.ER001:
        return ErrorMessages.ER001(params);
      case MessageCode.ER002:
        return ErrorMessages.ER002(params);
      case MessageCode.ER003:
        return ErrorMessages.ER003(params);
      case MessageCode.ER004:
        return ErrorMessages.ER004(params);
      case MessageCode.ER005:
        return ErrorMessages.ER005(params, '');
      case MessageCode.ER006:
        return ErrorMessages.ER006(params, 125);
      case MessageCode.ER007:
        return ErrorMessages.ER007(params, 8, 50);
      case MessageCode.ER008:
        return ErrorMessages.ER008(params);
      case MessageCode.ER009:
        return ErrorMessages.ER009(params);
      case MessageCode.ER010:
        return ErrorMessages.ER010(params);
      case MessageCode.ER011:
        return ErrorMessages.ER011(params);
      case MessageCode.ER012:
        return ErrorMessages.ER012();
      case MessageCode.ER013:
        return ErrorMessages.ER013();
      case MessageCode.ER014:
        return ErrorMessages.ER014();
      case MessageCode.ER015:
        return ErrorMessages.ER015();
      case MessageCode.ER016:
        return ErrorMessages.ER016();
      case MessageCode.ER017:
        return ErrorMessages.ER017();
      case MessageCode.ER018:
        return ErrorMessages.ER018(params);
      case MessageCode.ER019:
        return ErrorMessages.ER019();
      case MessageCode.ER020:
        return ErrorMessages.ER020();
      case MessageCode.ER021:
        return ErrorMessages.ER021();
      case MessageCode.ER022:
        return ErrorMessages.ER022();
      case MessageCode.ER023:
        return ErrorMessages.ER023();
      default:
        return '';
    }
  }
}
