import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, IconButton } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { ToastContainer, toast } from "react-toastify";

//
import Cards from "../../components/Landing/Card";
import api from "../../utils/api";
import { addCustomer } from "../../modules/customer/actions";

function Home() {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.adminAuth);

  const isCustomer = admin?.role === "customer";

  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const datas = {
      name: data.get("name"),
      email: data.get("email"),
      contact: data.get("contact"),
      user: admin._id,
      //   role,
    };
    dispatch(addCustomer(datas));
    // const resp = await api.post(`user/add_user`, datas);
    // console.log("respoo", resp);
    // navigate("/auth/login");
    // if (resp.data.success) {
    // toast.success("Register successfully", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    // });
    // }
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid container sx={{ p: 2 }}>
        <Grid item>
          <Cards />
        </Grid>
        <Grid item style={{ alignSelf: "center" }}>
          {!isCustomer && (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              {/* <input hidden accept="image/*" type="file" /> */}
              <ControlPointIcon
                style={{ height: "100px", width: "100px" }}
                onClick={handleClickOpen}
              />
            </IconButton>
          )}

          {/* <Button variant="outlined" onClick={handleClickOpen}>
            Open form dialog
          </Button> */}
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  margin="dense"
                  variant="standard"
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  variant="standard"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  variant="standard"
                  autoComplete="given-name"
                  name="contact"
                  required
                  fullWidth
                  id="contact"
                  label="Contact"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              //   fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

export default Home;
