import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'myDatePipe' })
export class MyDatePipe implements PipeTransform {
  // adding a default format in case you don't want to pass the format
  // then 'yyyy-MM-dd' will be used
  transform(date: Date | string, format: string = 'yyyy-MM-dd HH:MM:SS'): string {
    date = new Date(date);  // if orginal type was a string
    return new DatePipe('en-US').transform(date, format);
  }
}