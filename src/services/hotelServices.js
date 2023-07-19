import { baseService } from "./baseServices";

export class HotelService extends baseService {
  constructor() {
    super();
  }
  //   getHotelList = () => {
  //     return this.get(`/get-all-hotel`);
  //   };
}

export const hotelService = new HotelService();
