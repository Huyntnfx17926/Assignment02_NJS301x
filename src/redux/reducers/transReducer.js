import { TRANSACTION_ACTION } from "../actions/types/transTypes";

const initialState = {
  lastestList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION_ACTION.GET_LASTEST_LIST:
      state.lastestList = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
