import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} /> {/* 기본 주소 */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
