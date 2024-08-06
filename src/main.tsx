import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import Dashboard from "./pages/Dashboard";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <div style={{width:"100vw"}}>
      <Dashboard />
    </div>
  </React.StrictMode>
);
