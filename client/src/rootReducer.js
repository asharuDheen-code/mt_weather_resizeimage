import { combineReducers } from "redux";
import adminAuth from "./modules/admin/reducer";
import customer from "./modules/customer/reducer";
import image from "./modules/image/reducer";

export default combineReducers({
  adminAuth,
  customer,
  image,
});
