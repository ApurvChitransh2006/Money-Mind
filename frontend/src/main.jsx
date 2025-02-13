import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Import global styles if needed
import ContextProvider from "./context/ContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider>
            <App />
        </ContextProvider>
    </React.StrictMode>
);
