import opentelemetry from '@opentelemetry/api';
import { Resource } from '@opentelemetry/resources';
import {
  SimpleSpanProcessor,
  BasicTracerProvider,
  ConsoleSpanExporter,
} from '@opentelemetry/sdk-trace-base';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

import { JaegerExporter } from '@opentelemetry/exporter-jaeger';

const provider = new BasicTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'service-z',
  }),
});

// Configure span processor to send spans to the exporter
const exporter = new JaegerExporter({
  endpoint: 'http://localhost:14268/api/traces',
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

/**
 * Initialize the OpenTelemetry APIs to use the BasicTracerProvider bindings.
 *
 * This registers the tracer provider with the OpenTelemetry API as the global
 * tracer provider. This means when you call API methods like
 * `opentelemetry.trace.getTracer`, they will use this tracer provider. If you
 * do not register a global tracer provider, instrumentation which calls these
 * methods will receive no-op implementations.
 */
provider.register();
export const tracer = opentelemetry.trace.getTracer('basic-tracer-node');
