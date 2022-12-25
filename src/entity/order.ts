import { OrderDeliveryDate } from "./order-delivery-date";
import { OrderItem } from "./order-item";
import { OrderPrice } from "./order-price";

// 注文
export type Order = {
  id: string; // 注文番号
  date: Date; // 注文日時
  deliveryDate: OrderDeliveryDate; // 届け日時
  recipient: string; // 届け先氏名
  address: string; // 届け先住所
  link: string; // リンク
  tel: string; // 届け先TEL
  store: string; // 対応店舗名
  items: OrderItem[]; // 購入商品
  totalPrice: string; // 総計
};
