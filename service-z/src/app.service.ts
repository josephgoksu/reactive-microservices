import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class AppService {
  ping(): Observable<string> {
    return of('pong').pipe();
  }
}
