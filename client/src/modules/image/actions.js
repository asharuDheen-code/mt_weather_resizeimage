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
    // dispatch(getAllBrands());
  } catch (error) {
    console.log("");
  }
};
