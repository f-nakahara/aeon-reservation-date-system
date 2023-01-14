import { Order } from "../entity/order";
import { GoogleCalendarRepository } from "../repository/google-calendar-repository/google-calendar-repository";
import { GoogleMailRepository } from "../repository/google-mail-repository/google-mail-repository";

export class OrderController {
  mailRepository: GoogleMailRepository;
  calendarRepository: GoogleCalendarRepository;

  constructor(param: {
    mailRepository: GoogleMailRepository;
    calendarRepository: GoogleCalendarRepository;
  }) {
    this.mailRepository = param.mailRepository;
    this.calendarRepository = param.calendarRepository;
  }

  async getLatestOrder(): Promise<Order> {
    const threads = await this.mailRepository.search({
      query: {
        from: "aeonnetshop@aeonnetshop.com",
        subject: "【イオンネットスーパー】ご注文を承りました",
      },
      start: 0,
      max: 1,
    });
    if (threads.length === 0) {
      throw new Error();
    }
    const messages = threads[0].messages;
    if (messages.length === 0) {
      throw new Error();
    }
    const message = messages[0];
    const dateText = this.getValue(message.body, "お届け日時").split(" "); // 2022年 12月 19日 15:00-17:00
    const order: Order = {
      id: message.id,
      date: message.date,
      deliveryDate: {
        startTime: new Date(
          `${dateText[0].split("年")[0]}/${dateText[1].split("月")[0]}/${
            dateText[2].split("日")[0]
          } ${dateText[3].split("-")[0].split(":")[0]}:${
            dateText[3].split("-")[0].split(":")[1]
          }:00`
        ),
        endTime: new Date(
          `${dateText[0].split("年")[0]}/${dateText[1].split("月")[0]}/${
            dateText[2].split("日")[0]
          } ${dateText[3].split("-")[1].split(":")[0]}:${
            dateText[3].split("-")[1].split(":")[1]
          }:00`
        ),
      },
      recipient: this.getValue(message.body, "お客さま氏名"),
      address: this.getValue(message.body, "お届け先住所"),
      tel: this.getValue(message.body, "お届け先TEL"),
      store: this.getValue(message.body, "ご対応店舗"),
      link: threads[0].permaLink,
      items: [],
      totalPrice: message.body.split("お支払い総計：")[1].split("\n")[0],
    };
    return order;
  }

  getValue(text: string, key: string): string {
    let res = text.split(`[${key}] `)[1].split("\n")[0];
    res = res.replace("\r", "");
    return res;
  }

  async addToCalendar(order: Order): Promise<void> {
    await this.calendarRepository.createEvent({
      title: "イオンネットスーパー商品受取",
      startTime: order.deliveryDate.startTime,
      endTime: order.deliveryDate.endTime,
      options: {
        location: order.address,
        color: "3",
      },
    });
  }
}
