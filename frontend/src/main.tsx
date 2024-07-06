import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./styles/tailwind.scss";
import "./styles/App.scss";
import { HelmetProvider } from "react-helmet-async";
import { AuthContextProvider } from "./context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { BannerProvider } from "./context/BannerContext";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

const rootElement = document.getElementById("app");
if (!rootElement?.innerHTML) {
  const root = ReactDOM.createRoot(rootElement as ReactDOM.Container);
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <ChakraProvider>
          <AuthContextProvider>
            <BannerProvider>
              <RouterProvider router={router} />
            </BannerProvider>
          </AuthContextProvider>
        </ChakraProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
}
