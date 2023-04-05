import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Report from "./components/pages/Report/Report";

function App() {
  return (
    <div >
      <div className="heading">
        <h1>TRACALOGIC - SITE ASSET DATA AND DEVICE DATA TESTING REPORT</h1>
      </div>
      <div className="form-container">
        <Report />
      </div>
    </div>
  );
}

export default App;
