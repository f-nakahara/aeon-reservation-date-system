export type GMMessage = {
  id: string;
  subject: string;
  to: string;
  from: string;
  body: string;
  date: Date;
};

export class GMMessageConverter {
  fromGAS(data: GoogleAppsScript.Gmail.GmailMessage): GMMessage {
    return {
      id: data.getId(),
      subject: data.getSubject(),
      from: data.getFrom(),
      to: data.getTo(),
      body: data.getBody(),
      date: new Date(data.getDate().toDateString()),
    };
  }
}
