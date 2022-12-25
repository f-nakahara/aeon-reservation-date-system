import { OrderPrice } from "./order-price";

export type OrderItem = {
    id: string;
    name: string;
    price: OrderPrice;
    qty: number;
};