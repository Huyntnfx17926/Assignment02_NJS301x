import { transService } from "../../services/transServices";
import { TRANSACTION_ACTION } from "./types/transTypes";
import { createAction } from ".";

export const getLastestListAction = () => {
  return async (dispatch) => {
    try {
      const result = await transService.getLastestList();
      dispatch(createAction(TRANSACTION_ACTION.GET_LASTEST_LIST, result.data));
      return result.data;
    } catch (err) {
      console.log("err:", err);
    }
  };
};
