import { Outlet } from "react-router";

import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import "./Layout.css";

function Layout({ tab, setTab, onLogout }) {
  return (
    <div>
      <Header />
      <Navbar tab={tab} setTab={setTab} onLogout={onLogout} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
