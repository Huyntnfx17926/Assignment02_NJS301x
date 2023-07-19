import { baseService } from "./baseServices";

export class TransService extends baseService {
  constructor() {
    super();
  }
  getLastestList = () => {
    return this.get("/get-lastest-transaction");
  };
}

export const transService = new TransService();
