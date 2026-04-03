import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GalleryProvider } from "./context/GalleryContext.jsx";

createRoot(document.getElementById("root")).render(
  <GalleryProvider>
    <App />
  </GalleryProvider>,
);
