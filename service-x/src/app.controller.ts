import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import * as types from './app.types';
import { tracer } from './instrumentation';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: types.eventPattern.ping })
  getPong(): Observable<string> {
    // Create a span for the operation using the tracer.
    const parentSpan = tracer.startSpan('/ping');

    // Execute the operation.
    const response = this.appService.ping();

    // End the span.
    parentSpan.end();

    // Return the response.
    return response;
  }

  @MessagePattern({ cmd: types.eventPattern.isNumberEven })
  checkNumber(number: number): Observable<number> {
    Logger.log(number, 'AppController.checkNumber');
    // Create a span for the operation using the tracer.
    const parentSpan = tracer.startSpan('/checkNumber');

    // Execute the operation.
    const response = this.appService.isNumberEven(number);
    Logger.debug(response);

    // End the span.
    parentSpan.end();

    // Return the response.
    return response;
  }
}
