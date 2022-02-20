import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import * as types from './app.types';

// This is a simple example of an API Gateway that can be used as a client to call another microservice.
@Injectable()
export class AppService {
  constructor(
    @Inject('SERVICE_X') private readonly clientServiceX: ClientProxy,
    @Inject('SERVICE_Y') private readonly clientServiceY: ClientProxy,
    @Inject('SERVICE_Z') private readonly clientServiceZ: ClientProxy,
    private eventEmitter: EventEmitter2,
  ) {}

  @OnEvent(types.eventPattern.created, { async: true })
  async eventDistributor(data: types.eventData) {
    Logger.debug(data);
    const startTs = Date.now();
    const pattern = { cmd: data.eventPattern };

    switch (data.serviceName) {
      case types.serviceName[data.serviceName]:
        Logger.debug(`Emitting event to ${data.serviceName}`);
        return this.clientServiceX.send<string>(pattern, data.payload).pipe(
          map((message: string) => ({
            message,
            duration: Date.now() - startTs,
          })),
        );
      case types.serviceName[data.serviceName]:
        Logger.debug(`Emitting event to ${data.serviceName}`);
        return this.clientServiceY.send<string>(pattern, data.payload).pipe(
          map((message: string) => ({
            message,
            duration: Date.now() - startTs,
          })),
        );
      case types.serviceName[data.serviceName]:
        Logger.debug(`Emitting event to ${data.serviceName}`);
        return this.clientServiceZ.send<string>(pattern, data.payload).pipe(
          map((message: string) => ({
            message,
            duration: Date.now() - startTs,
          })),
        );

      default:
        throw new Error(`Unknown event: ${data.eventPattern}`);
    }
  }
}
