// TODO Add Scraper Page ? Add RD support ?
import React from "react";
import ReactDOM from "react-dom/client";
import {NextUIProvider} from "@nextui-org/react";
import { Toaster } from 'react-hot-toast';
import App from "./App";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <Toaster />
      <App />
    </NextUIProvider>
  </React.StrictMode>,
);