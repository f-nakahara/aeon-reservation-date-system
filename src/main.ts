import { OrderController } from "./controller/order-controller";
import { GMMessage } from "./repository/google-mail-repository/model/gm-message";
import { GoogleMailRepositoryImpl } from "./repository/google-mail-repository/google-mail-repository-impl";
import { GoogleCalendarRepositoryImpl } from "./repository/google-calendar-repository/google-calendar-repository-impl";

async function main() {
  const controller = new OrderController({
    mailRepository: new GoogleMailRepositoryImpl(),
    calendarRepository: new GoogleCalendarRepositoryImpl(),
  });
  const order = await controller.getLatestOrder();
  const today = new Date();
  let yesterday = new Date(today.toDateString());
  yesterday.setDate(yesterday.getDate() - 1);
  if (order.date > yesterday && order.date <= today) {
    await controller.addToCalendar(order);
  }
}
