import axios from "axios";
import { serverPath } from "../utils/path";

export class baseService {
  get = (url, params) => {
    if (params) {
      url = url + params;
    }
    return axios.get(`${serverPath}` + `${url}`);
  };

  post = (url, data) => {
    return axios.post(`${serverPath}` + `${url}`, { data });
  };
}
