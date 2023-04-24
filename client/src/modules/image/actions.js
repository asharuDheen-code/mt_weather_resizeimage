import axios from "axios";
import api from "../../utils/api";
import { setSession } from "../../utils/jwt";

export const uploadImage = (editImages) => async (dispatch) => {
  try {
    const { editImage, image, newImage } = editImages;
    const formData = new FormData();
    formData.append("image", editImage);
    formData.append("urls", newImage);
    await axios.post(
      "http://localhost:8080/api/user/addimage",
      formData,
      newImage
    );
    dispatch({
      type: "ADD_BANNER",
    });
    dispatch(getImages());
  } catch (error) {
    console.log("");
  }
};

export const getImages = (editImages) => async (dispatch) => {
  try {
    const { data } = await api.get("user/getimage");
    dispatch({
      type: "GET_IMAGES",
      payload: data?.response,
    });
    return data?.success;
  } catch (error) {
    console.log("");
  }
};
