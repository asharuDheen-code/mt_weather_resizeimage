import { Button, Stack, TextField } from "@mui/material";
import React, { Component, useState } from "react";
import Resizer from "react-image-file-resizer";
import { useDispatch } from "react-redux";
//
import { uploadImage } from "../../modules/image/actions";

function ImageReSizer() {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [editImage, setEditImage] = useState("");
  const [newImage, setNewImage] = useState("");
  const [imgHight, setImgHight] = useState();
  const [imgWidth, setImgWidth] = useState();

  console.log("new image", newImage);

  const clearFields = () => {
    setImgHight("");
    setImgWidth("");
    setNewImage("");
  };

  const submitImage = () => {
    dispatch(uploadImage({ editImage, image, newImage }));
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
      <Stack sx={{ alignItems: "center" }}>
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
        {/* <Button
          type="submit"
          // fullWidth
          variant="contained"
          // sx={{ mt: 3, mb: 2 }}
          // onClick={submitImage}
        >
          Submit
        </Button> */}
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
      </Stack>
      {/* <input
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
      </Button> */}
    </div>
  );
}

export default ImageReSizer;
