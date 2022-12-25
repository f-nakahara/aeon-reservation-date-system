import { GCEvent, GCEventConverter } from "./model/gc-event";
import {
  GCCreateEventParam,
  GoogleCalendarRepository,
} from "./google-calendar-repository";

export class GoogleCalendarRepositoryImpl implements GoogleCalendarRepository {
  async createEvent(param: GCCreateEventParam): Promise<GCEvent> {
    try {
      const calendar = CalendarApp.getDefaultCalendar();
      const options = {
        description: param.options?.description,
        location: param.options?.location,
        guests: param.options?.guests,
        sendInvites: param.options?.sendInvites ?? false,
      };
      const data = calendar.createEvent(
        param.title,
        param.startTime,
        param.endTime,
        options
      );
      if (param.options?.color != undefined) {
        data.setColor(param.options!.color!);
      }
      const res = GCEventConverter.fromGAS(data);
      return res;
    } catch (e) {
      throw e;
    }
  }
}
