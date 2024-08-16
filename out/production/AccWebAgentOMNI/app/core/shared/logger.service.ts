import {Injectable,} from '@angular/core';

@Injectable()
export class LoggerService {
  static log(msg: string): void {
    var date = new Date();
    date.getDate();
    var ddd = date.getFullYear() + "/" + (date.getMonth() + 1) + "/"  + date.getDay() + " " + date.getHours() + ":"  + date.getMinutes() + ":" + date.getSeconds();
    console.warn(ddd +  "-> " + msg);
  }

  static error(msg: string, obj = {}): void {
    console.error(msg, obj);
  }
}

