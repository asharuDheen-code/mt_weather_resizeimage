import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { Component, useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//
import { getImages, uploadImage } from "../../modules/image/actions";

function ImageReSizer() {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [editImage, setEditImage] = useState("");
  const [newImage, setNewImage] = useState("");
  const [imgHight, setImgHight] = useState();
  const [imgWidth, setImgWidth] = useState();

  const { images } = useSelector((state) => state.image);

  useEffect(() => {
    dispatch(getImages());
  }, []);

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("image url copied", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const clearFields = () => {
    setImgHight("");
    setImgWidth("");
    setNewImage("");
  };

  const submitImage = async () => {
    const resp = await dispatch(uploadImage({ editImage, image, newImage }));
    setEditImage("");
    setImage("");
    setNewImage("");
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setEditImage(event.target.files[0]);
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const fileChangedHandler = (event) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          imgHight,
          imgWidth,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            setNewImage(uri);
          },
          "base64"
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      <ToastContainer />
      {/* <Stack sx={{ alignItems: "center" }}>
        <TextField
          margin="normal"
          required
          value={imgHight}
          id="height"
          label="Image Hight"
          name="height"
          autoComplete="height"
          autoFocus
          onChange={(e) => setImgHight(e.target.value)}
          sx={{ width: "20%" }}
        />
        <TextField
          margin="normal"
          required
          value={imgWidth}
          id="width"
          label="Image Width"
          name="width"
          autoComplete="width"
          autoFocus
          onChange={(e) => setImgWidth(e.target.value)}
          sx={{ width: "20%", pb: 2 }}
        />
        {imgHight && imgWidth ? (
          <input type="file" onChange={fileChangedHandler} />
        ) : null}
        <img src={newImage} alt="" style={{ marginTop: 30 }} />
        <TextField
          margin="normal"
          required
          value={newImage}
          id="width"
          label="url (base64)"
          name="width"
          autoComplete="width"
          autoFocus
          onClick={() => {
            navigator.clipboard.writeText(newImage);
          }}
          sx={{ width: "20%", pb: 2 }}
        />
      </Stack>
      <Stack direction="row" sx={{ justifyContent: "center" }} spacing={1}>
        <Button
          type="submit"
          // fullWidth
          variant="contained"
          // sx={{ mt: 3, mb: 2 }}
          // onClick={submitImage}
        >
          Submit
        </Button>
        <Button
          type="submit"
          // fullWidth
          success
          variant="contained"
          // sx={{ mt: 3, mb: 2 }}
          onClick={clearFields}
        >
          Clear
        </Button>
      </Stack> */}
      <Stack sx={{ alignItems: "center", m: 2 }}>
        <input
          type="file"
          accept="image/*"
          // style={{ display: "none" }}
          // maxSize={1000}
          id="contained-button-file"
          onChange={onImageChange}
          // width="1500"
          // height="800"
        />
        <Button
          type="submit"
          // fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={submitImage}
        >
          Submit
        </Button>
      </Stack>
      <Grid container spacing={2} sx={{ m: 2 }}>
        {images &&
          images?.map((val, ind) => (
            <Grid item>
              <Card sx={{ maxWidth: 345 }} key={ind}>
                <CardActionArea>
                  <CardMedia
                    onClick={() => copyUrl(val.image)}
                    component="img"
                    height="140"
                    image={val?.image}
                    alt={val?.name}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default ImageReSizer;
