import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { tracer } from './instrumentation';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'ping' })
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
}
