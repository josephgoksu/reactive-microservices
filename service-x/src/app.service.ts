import { Injectable, Logger } from '@nestjs/common';
import { Observable, of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { OnEvent } from '@nestjs/event-emitter';
import { range } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class AppService {
  ping(): Observable<string> {
    return of('pong').pipe();
  }

  isNumberEven(number: number): Observable<number> {
    Logger.log(number, 'AppService.isNumberEven');
    return of(number).pipe(filter((n) => n % 2 === 0));

    // const numbers = range(1, 200).pipe(
    //   filter((result) => result % 2 === 1),
    //   map((result) => result * 2),
    // );

    // const results = numbers.subscribe((result) => console.log(result));

    // return results;
  }
}
