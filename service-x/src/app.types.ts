export enum eventPattern {
  created = 'created',
  ping = 'ping',
  isNumberEven = 'isNumberEven',
}

export enum serviceName {
  SERVICE_X = 'SERVICE_X',
  SERVICE_Y = 'SERVICE_Y',
  SERVICE_Z = 'SERVICE_Z',
}

export type payload = {
  data?: any;
  error?: any;
  message?: string;
  status?: number;
};

export interface eventData {
  eventPattern: eventPattern;
  serviceName: serviceName;
  payload: payload;
}
