import { combineReducers } from "redux";
import adminAuth from "./modules/admin/reducer";
import customer from "./modules/customer/reducer";

export default combineReducers({
  adminAuth,
  customer,
});
