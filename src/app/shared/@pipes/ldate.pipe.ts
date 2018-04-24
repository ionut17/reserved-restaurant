import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';

@Pipe({name: 'ldate'})
export class LdatePipe implements PipeTransform {

  transform(value: string | Date | Moment, format?: string): Moment | Date | string {
    if (!value) return value;
    const output:Moment = moment.utc(value).local();
    return format ? output.format(format) : output;
  }
}