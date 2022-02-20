import { Body, Controller, Get, Logger, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { tracer } from './instrumentation';
import opentelemetry from '@opentelemetry/api';
import * as types from './app.types';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private eventEmitter: EventEmitter2) {}

  //   @Get('/ping-all')
  //   pingAll() {
  //     // Create a span. A span must be closed.
  //     const parentSpan = tracer.startSpan('main');
  //     for (let i = 0; i < 10; i += 1) {
  //       doWork(parentSpan);
  //     }
  //     // Be sure to end the span.
  //     parentSpan.end();

  //     // flush and close the connection.
  //     // exporter.shutdown();

  //     function doWork(parent) {
  //       // Start another span. In this example, the main method already started a
  //       // span, so that'll be the parent span, and this will be a child span.
  //       const ctx = opentelemetry.trace.setSpan(
  //         opentelemetry.context.active(),
  //         parent,
  //       );
  //       const span = tracer.startSpan('doWork', undefined, ctx);

  //       // simulate some random work.
  //       for (let i = 0; i <= Math.floor(Math.random() * 40000000); i += 1) {
  //         // empty
  //       }

  //       // Set attributes to the span.
  //       span.setAttribute('key', 'value');

  //       // Annotate our span to capture metadata about our operation
  //       span.addEvent('invoking doWork');

  //       span.end();
  //     }

  //     const parentSpan2 = tracer.startSpan('/ping-all');
  //     const result = zip(
  //       this.appService.emitEvent(eventPattern.ping, {
  //         message: 'hello to service X',
  //       }),
  //       this.appService.emitEvent(eventPattern.ping),
  //       this.appService.emitEvent(eventPattern.ping),
  //     ).pipe(
  //       map(([pongServiceX, pongServiceY, pongServiceZ]) => ({
  //         pongServiceX,
  //         pongServiceY,
  //         pongServiceZ,
  //       })),
  //     );
  //     parentSpan2.end();

  //     return result;
  //   }

  @Post('/emit-to')
  async emitTo(@Req() req, @Res() res, @Body() body) {
    const data: types.eventData = body;

    const parentSpan = tracer.startSpan('/emit-to');
    try {
      const resp = await this.eventEmitter.emitAsync(types.eventPattern.created, data);
      return res.status(200).send(resp);
    } catch (error) {
      res.status(500).send(error);
      Logger.error(error);
    }
    parentSpan.end();
  }
}
