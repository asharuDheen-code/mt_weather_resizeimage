import React from "react";

// routes
import Router from "./routes/routes";
import ButtonAppBar from "./pages/Nav/NavBar";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <>
      <ButtonAppBar />
      <Router />
    </>
  );
}
