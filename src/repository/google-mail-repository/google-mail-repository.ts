import { GMThread } from "./model/gm-thread";

export interface GoogleMailRepository {
  search(param: GMSearchParam): Promise<GMThread[]>;
}

export type GMSearchParam = {
  query: {
    from?: string;
    to?: string;
    after?: Date;
    before?: Date;
    subject?: string;
  };
  start: number;
  max: number;
};
