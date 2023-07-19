import { userService } from "../../services/userServices";
import { USER_ACTION } from "./types/userTypes";
import { createAction } from ".";

export const logInAction = (loginInfo) => {
  return async (dispatch) => {
    try {
      const result = await userService.logIn(loginInfo);
      dispatch(createAction(USER_ACTION.LOGIN, result.data));
      return result.data.isAdmin;
    } catch (err) {
      return err;
    }
  };
};

export const logOutAction = (callback) => {
  return (dispatch) => {
    try {
      dispatch(createAction(USER_ACTION.LOGOUT));
      callback();
    } catch (err) {
      console.log("err:", err);
    }
  };
};
