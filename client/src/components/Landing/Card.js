import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCustomers,
  getAllCustomers,
  getCustomers,
} from "../../modules/customer/actions";
import { Grid } from "@mui/material";
//

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Cards() {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.adminAuth);
  const { customer } = useSelector((state) => state.customer);

  const isCustomer = admin?.role === "customer";

  const deleteCustomer = (customer) => {
    dispatch(deleteCustomers({ customer, user: admin?._id }));
  };

  React.useEffect(() => {
    if (admin.role === "customer") {
      dispatch(getAllCustomers());
    } else {
      dispatch(getCustomers(admin?._id));
    }
  }, [admin?._id]);

  return (
    <Grid container spacing={2}>
      {customer &&
        customer?.map((data, index) => (
          <Grid item>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Customer Details
                </Typography>
                <Typography variant="h5" component="div">
                  {data.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {data.email}
                </Typography>
                <Typography variant="body2">
                  {data.contact}
                  <br />
                  valid user
                </Typography>
              </CardContent>
              {!isCustomer && (
                <CardActions>
                  <Button size="small" onClick={() => deleteCustomer(data._id)}>
                    Delete
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}
