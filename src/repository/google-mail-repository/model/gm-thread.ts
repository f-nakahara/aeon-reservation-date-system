import { GMMessage } from "./gm-message";

export type GMThread = {
  id: string;
  messages: GMMessage[];
  permaLink: string;
};

export class GMThreadConverter {
  static fromGAS(data: GoogleAppsScript.Gmail.GmailThread): GMThread {
    return {
      id: data.getId(),
      messages: data.getMessages().map((m): GMMessage => {
        return {
          id: m.getId(),
          subject: m.getSubject(),
          from: m.getFrom(),
          to: m.getTo(),
          body: m.getBody(),
          date: new Date(m.getDate().toDateString()),
        };
      }),
      permaLink: data.getPermalink(),
    };
  }
}
