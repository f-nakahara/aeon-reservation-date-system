import { OrderController } from "./controller/order-controller";
import { GMMessage } from "./model/gm-message";
import { GoogleMailRepositoryImpl } from "./repository/google-mail-repository/google-mail-repository-impl";

async function main() {
  const controller = new OrderController({
    mailRepository: new GoogleMailRepositoryImpl(),
  });
  const order = await controller.getLatestOrder();
  console.log(order);
}
