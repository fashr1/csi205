import { useState } from "react";
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import Layout from "./layouts/Layout/Layout";
import { CartProvider } from "./contexts/CartContext";

import Home from "./pages/Home/Home";
import Calculator from "./pages/Calculator/Calculator";
import Component from "./pages/components/Components/component";
import Animation from "./pages/Animation/animation";
import Todos from "./pages/Todos";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./App.css";

const initTab = "home";

// หน้า Login
function LoginPage({ setIsLoggedIn }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (user === "fashr" && pass === "1234") {
      setIsLoggedIn(true);
      alert("เข้าสู่ระบบสำเร็จ!");
      navigate("/home");
    } else {
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>เข้าสู่ระบบ</h2>
        <input
          type="text"
          placeholder="ชื่อผู้ใช้"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button onClick={handleLogin}>เข้าสู่ระบบ</button>
        <div className="login-footer">
          <p>
            ชื่อผู้ใช้: <b>fashr</b> | รหัสผ่าน: <b>1234</b>
          </p>
        </div>
      </div>
    </div>
  );
}

// ป้องกันหน้า PrivateRoute
function PrivateRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/login" />;
}

// HOC สำหรับ Layout เพื่ออ่าน route ปัจจุบันและตั้ง tab อัตโนมัติ
function LayoutWrapper({ onLogout }) {
  const location = useLocation();
  const path = location.pathname.replace("/", "").toLowerCase() || "home";

  return <Layout tab={path} setTab={() => {}} onLogout={onLogout} />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("ออกจากระบบแล้ว");
    window.location.hash = "#/login";
  };

  return (
    <CartProvider>
      <div className="app-container">
        <HashRouter>
          <Routes>
            {/* หน้า Login */}
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />

            {/* หน้าอื่น ๆ (ต้องล็อกอินก่อน) */}
            <Route
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <LayoutWrapper onLogout={handleLogout} />
                </PrivateRoute>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/animation" element={<Animation />} />
              <Route path="/components" element={<Component />} />
              <Route path="/Todos" element={<Todos />} />
              <Route path="/product" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    </CartProvider>
  );
}

export default App;
