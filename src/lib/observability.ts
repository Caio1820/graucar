/**
 * @file observability.ts
 * Observability & Telemetry layer for Garagem Grau Car 096 BioSite.
 * Provides unified integration hooks for Sentry, Datadog RUM, New Relic & OpenTelemetry.
 */

export interface TelemetryEvent {
  name: string;
  category: 'interaction' | 'navigation' | 'booking' | 'conversion' | 'performance' | 'error';
  properties?: Record<string, unknown>;
  timestamp: number;
}

export interface TelemetrySpan {
  id: string;
  name: string;
  startTime: number;
  endTime?: number;
  attributes: Record<string, unknown>;
}

class ObservabilityManager {
  private spans: Map<string, TelemetrySpan> = new Map();
  private isSentryActive = false;
  private isDatadogActive = false;
  private isOpenTelemetryActive = false;

  constructor() {
    this.initProviders();
  }

  private initProviders() {
    // Check for runtime injection of Sentry/Datadog/OTel via window or env
    if (typeof window !== 'undefined') {
      const win = window as unknown as {
        Sentry?: { captureException: (e: unknown) => void; captureMessage: (m: string) => void };
        datadogRum?: { addAction: (name: string, props: unknown) => void };
      };
      this.isSentryActive = Boolean(win.Sentry);
      this.isDatadogActive = Boolean(win.datadogRum);
    }
  }

  /**
   * Tracks an event across configured monitoring tools (Datadog, OpenTelemetry, GA)
   */
  public trackEvent(
    name: string,
    category: TelemetryEvent['category'],
    properties?: Record<string, unknown>
  ): void {
    const event: TelemetryEvent = {
      name,
      category,
      properties: {
        ...properties,
        app: 'grau-car-096-biosite',
        environment:
          typeof import.meta !== 'undefined' && import.meta.env
            ? import.meta.env.MODE || 'production'
            : 'production',
      },
      timestamp: Date.now(),
    };

    // Forward to Datadog RUM if available
    if (typeof window !== 'undefined') {
      const win = window as unknown as {
        datadogRum?: { addAction: (name: string, props: unknown) => void };
      };
      if (win.datadogRum) {
        win.datadogRum.addAction(name, event.properties);
      }
    }

    // Performance marks for browser DevTools and OpenTelemetry Web Tracing
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(`graucar:${name}`);
    }

    // Dispatch custom DOM event for third-party scripts/tag managers
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('graucar:telemetry', { detail: event }));
    }
  }

  /**
   * OpenTelemetry & New Relic performance span measurement
   */
  public startSpan(name: string, attributes: Record<string, unknown> = {}): string {
    const spanId = `span_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.spans.set(spanId, {
      id: spanId,
      name,
      startTime: performance.now(),
      attributes,
    });
    return spanId;
  }

  public endSpan(spanId: string, additionalAttributes?: Record<string, unknown>): void {
    const span = this.spans.get(spanId);
    if (!span) return;
    span.endTime = performance.now();
    const durationMs = span.endTime - span.startTime;

    this.trackEvent(`span_completed:${span.name}`, 'performance', {
      durationMs,
      ...span.attributes,
      ...additionalAttributes,
    });

    this.spans.delete(spanId);
  }

  /**
   * Captures runtime errors for Sentry and logging systems
   */
  public captureError(error: Error | unknown, context?: Record<string, unknown>): void {
    const errObj = error instanceof Error ? error : new Error(String(error));

    if (typeof window !== 'undefined') {
      const win = window as unknown as {
        Sentry?: { captureException: (e: unknown, ctx?: unknown) => void };
      };
      if (win.Sentry) {
        win.Sentry.captureException(errObj, { extra: context });
      }
    }

    this.trackEvent('app_exception', 'error', {
      message: errObj.message,
      stack: errObj.stack,
      context,
    });
  }
}

export const telemetry = new ObservabilityManager();
