import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, TextField } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

// weatherAPI: 6ea3fb51b856aa9f6a2e4eb6b6a4bc1f
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

export default function BasicCard() {
  const [search, setSearch] = React.useState("");
  const [selectedWeather, setSelectedWeather] = React.useState("");

  const clearFields = () => {
    setSearch("");
    setSelectedWeather("");
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=6ea3fb51b856aa9f6a2e4eb6b6a4bc1f&units=metric`
      );
      const weth = await res.json();
      console.log("resp", res);
      console.log("weth", weth);
      setSelectedWeather(weth);
    };
    fetchData();
  }, [search]);

  return (
    <>
      <Box component={Container} sx={{ textAlign: "-webkit-center" }}>
        <TextField
          margin="normal"
          name="weather"
          label="City"
          type="weather"
          id="weather"
          autoComplete="current-weather"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </Box>
      <Box component={Container} sx={{ textAlign: "-webkit-center" }}>
        <Card sx={{ width: "50%" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Country
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {selectedWeather?.sys?.country}
            </Typography>
            <Typography variant="h5" component="div">
              Temprature
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {selectedWeather?.main?.temp} °C
            </Typography>
            <Typography variant="h5" component="div">
              Humidity
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {selectedWeather?.main?.humidity} %
            </Typography>
            <Typography variant="h5" component="div">
              Wind
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {selectedWeather?.wind?.speed} km/h
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={clearFields}
            >
              Clear
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
