import api from "../../utils/api";

export const addCustomer = (datas) => async (dispatch) => {
  try {
    const resp = await api.post(`/user/add_user`, datas);
    console.log("respoo", resp);
    dispatch(getCustomers(datas.user));
    return resp;
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

export const deleteCustomers = (data) => async (dispatch) => {
  try {
    console.log("respo7777777o", data);
    const { customer, user } = data;
    const resp = await api.delete(`/user/delete_customer`, {
      params: { customer },
    });
    console.log("respoo", resp);
    dispatch(getCustomers(user));
    return resp;
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

export const getCustomers = (user) => async (dispatch) => {
  try {
    // const response = api.get('/api/auth/login');
    const { data } = await api.get("/user/get_customers", { params: { user } });
    dispatch({
      type: "CUSTOMER",
      payload: data.response,
    });
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

export const getAllCustomers = (user) => async (dispatch) => {
  try {
    // const response = api.get('/api/auth/login');
    const { data } = await api.get("/user/get_all_customers");
    dispatch({
      type: "CUSTOMER",
      payload: data.response,
    });
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};
