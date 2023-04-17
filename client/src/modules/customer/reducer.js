import { CUSTOMER } from "./constants";

const initialState = {
  token: localStorage.getItem("accessToken"),
  customer: [],
};

export default function customer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CUSTOMER:
      return {
        ...state,
        customer: payload,
      };
    default:
      return state;
  }
}
