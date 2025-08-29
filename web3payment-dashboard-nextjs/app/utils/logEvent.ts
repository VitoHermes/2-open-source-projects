import { isDevelopment } from './constants';

declare const window: Window &
  typeof globalThis & {
    ClientAnalytics: {
      logEvent: LogEvent;
    };
  };

enum ActionType {
  unknown = 'unknown',
  blur = 'blur',
  click = 'click',
  change = 'change',
  dismiss = 'dismiss',
  focus = 'focus',
  hover = 'hover',
  select = 'select',
  measurement = 'measurement',
  move = 'move',
  process = 'process',
  render = 'render',
  scroll = 'scroll',
  view = 'view',
  search = 'search',
  keyPress = 'keyPress',
  error = 'error',
}

enum AnalyticsEventImportance {
  low = 'low',
  high = 'high',
}

type CCAEventData = {
  action?: ActionType;
  address?: string;
  context?: string;
  error?: string;
  wallet_type?: string;
  wallet_connector_id?: string;
  href?: string;
  hostname?: string;
  origin?: string;
  pathname?: string;
  search?: string;
};

type AnalyticsEventData = {
  name: string;
  event: CCAEventData;
  importance: AnalyticsEventImportance;
};

type LogEvent = (eventName: string, eventData: CCAEventData, importance?: AnalyticsEventImportance) => void;

export default function logEvent(name: string, event: CCAEventData, importance: AnalyticsEventImportance | undefined) {
  if (isDevelopment) {
    return console.log('logEvent: ', {
      name,
      event,
      importance,
    });
  }

  const CCA = window.ClientAnalytics;
  if (CCA) {
    CCA?.logEvent(name, event, importance);
  }
}

export function identify(event: CCAEventData) {
  if (isDevelopment) {
    return console.log('identify: ', {
      event,
    });
  }

  const CCA = window.ClientAnalytics;
  if (CCA) {
    CCA?.logEvent('identify', event, AnalyticsEventImportance.low);
  }
}

export { ActionType, AnalyticsEventImportance };
export type { AnalyticsEventData, CCAEventData, LogEvent };
