export type GCEvent = {
  id: string;
  title: string;
};

export class GCEventConverter {
  static fromGAS(data: GoogleAppsScript.Calendar.CalendarEvent): GCEvent {
    return {
      id: data.getId(),
      title: data.getTitle(),
    };
  }
}
