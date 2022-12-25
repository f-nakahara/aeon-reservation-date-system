import { GCEvent } from "./model/gc-event";

export interface GoogleCalendarRepository {
  createEvent(param: GCCreateEventParam): Promise<GCEvent>;
}

export type GCCreateEventParam = {
  title: string;
  startTime: Date;
  endTime: Date;
  options?: {
    description?: string;
    location?: string;
    guests?: string;
    sendInvites?: boolean;
    color?: string;
  };
};
