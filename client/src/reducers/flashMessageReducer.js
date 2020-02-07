import { ENABLE_FLASH_MESSAGE, DISABLE_FLASH_MESSAGE } from "../actions/types";

const initialState = {
  show: false,
  message: "",
  type: ""
};

const flashMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_FLASH_MESSAGE:
      return {
        ...state,
        show: true,
        message: action.payload.message,
        type: action.payload.type
      };
    case DISABLE_FLASH_MESSAGE:
      return {
        ...state,
        show: false,
        message: "",
        type: ""
      };
    default:
      return state;
  }
};
export default flashMessagesReducer;
