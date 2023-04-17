import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid, TextField } from "@mui/material";
import axios from "axios";

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
  const [lat, setLat] = React.useState("");
  const [lon, setLon] = React.useState("");

  const params = {
    access_key: "018dc74de4c275d4777a8160d68a155e",
    query: "New York",
  };
  const apiKey = "6ea3fb51b856aa9f6a2e4eb6b6a4bc1f";

  const clearFields = () => {
    setSearch("");
    setSelectedWeather("");
  };

  const callApi = async () => {
    await axios
      .get("https://api.weatherstack.com/current", { params })
      .then((response) => {
        const apiResponse = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    const apiresp = await fetch(`http://api.weatherstack.com/forecast
  ? access_key = 018dc74de4c275d4777a8160d68a155e
  & query = New York
  & forecast_days = 6
  & hourly = 1`);
  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position?.coords?.latitude);
      setLon(position?.coords?.longitude);
    });
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const weth = await res.json();
      setSelectedWeather(weth);
    };
    fetchData();
  }, [lat && lon]);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${apiKey}&units=metric`
      );
      const weth = await res.json();
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
        <Grid container spacing={2}>
          {selectedWeather?.list &&
            selectedWeather?.list?.slice(0, 7).map((val) => (
              <Grid item>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Country
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {selectedWeather?.city?.country}
                    </Typography>
                    <Typography variant="h5" component="div">
                      Temprature
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {val?.main?.temp} °C
                    </Typography>
                    <Typography variant="h5" component="div">
                      Humidity
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {val?.main?.humidity} %
                    </Typography>
                    <Typography variant="h5" component="div">
                      Wind
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {val?.wind?.speed} km/h
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={clearFields}
                    >
                      Clear
                    </Button> */}
                    {/* <Button
                      // type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={callApi}
                    >
                      call api
                    </Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}
