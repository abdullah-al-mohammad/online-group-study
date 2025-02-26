import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Route/Root.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <div className="max-w-screen-2xl mx-auto">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </StrictMode>
);
