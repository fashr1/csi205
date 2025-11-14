import { Link } from "react-router-dom";
import "./Navbar.css";
import { useCart } from "../../contexts/CartContext"; // ✅ เพิ่มบรรทัดนี้

function Navbar({ tab, setTab, onLogout }) {
  const { getCartCount, getProductCount } = useCart(); // ✅ ดึงค่าจำนวนจาก Context

  return (
    <div className="navbar-container">
      <Link to="/home">
        <button
          className={
            "btn " + (tab === "home" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("home")}
        >
          Home
        </button>
      </Link>

      <Link to="/calculator">
        <button
          className={
            "btn " +
            (tab === "calculator" ? "btn-success" : "btn-outline-success")
          }
          onClick={() => setTab("calculator")}
        >
          Calculator
        </button>
      </Link>

      <Link to="/animation">
        <button
          className={
            "btn " +
            (tab === "animation" ? "btn-secondary" : "btn-outline-secondary")
          }
          onClick={() => setTab("animation")}
        >
          Animation
        </button>
      </Link>

      <Link to="/components">
        <button
          className={
            "btn " +
            (tab === "components" ? "btn-danger" : "btn-outline-danger")
          }
          onClick={() => setTab("components")}
        >
          Components
        </button>
      </Link>

      <Link to="/Todos">
        <button
          className={
            "btn " + (tab === "Todos" ? "btn-dark" : "btn-outline-dark")
          }
          onClick={() => setTab("Todos")}
        >
          Todos
        </button>
      </Link>

      {/* ✅ ปุ่มสินค้า */}
      <Link to="/product">
        <button
          className={
            "btn " + (tab === "product" ? "btn-warning" : "btn btn-outline-warning")
          }
          onClick={() => setTab("product")}
        >
          Products ({getProductCount()})
        </button>
      </Link>

      {/* ✅ ปุ่มตะกร้า */}
      <Link to="/cart">
        <button
          className={
            'btn ' +
            (tab === 'cart' ? 'btn-info' : "btn btn-outline-info") +
            ' cart-button'
          }
          onClick={() => setTab('cart')}
        >
          Cart
          {getCartCount() > 0 && (
            <span className="cart-badge">{getCartCount()}</span>
          )}
        </button>
      </Link>

      {/* ✅ ปุ่ม Logout */}
      <button
        className="btn btn-outline-danger"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
