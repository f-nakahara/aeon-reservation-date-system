import { GMSearchParam, GoogleMailRepository } from "./google-mail-repository";
import { GMThread, GMThreadConverter } from "./model/gm-thread";

export class GoogleMailRepositoryImpl implements GoogleMailRepository {
  async search(param: GMSearchParam): Promise<GMThread[]> {
    try {
      const query = param.query;
      const queryText = `from:(${query.from ?? ""}) subject:(${
        query.subject ?? ""
      })`;
      const data = GmailApp.search(queryText, param.start, param.max);
      const res = data.map((v) => GMThreadConverter.fromGAS(v));
      return res;
    } catch (e) {
      throw e;
    }
  }
}
