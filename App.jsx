import {BrowserRouter as Router,Routes,Route,Navigate,} from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import AccessibilityWidget from "./components/AccessibilityWidget/AccessibilityWidget";
import ProductManager from "./components/ProductManager/ProductManager";
import AddProduct from "./components/AddProduct/AddProduct";
// Pages
import PropertySearch from "./pages/PropertySearch/PropertySearch";
import Home from "./pages/Home/Home";
import Calculator from "./pages/Calculator/Calculator";
import LogIn from "./pages/LogInPage/LogIn";
import SignUp from "./pages/SignUpPage/SignUp";
import Products from "./pages/ProductList/Products";
import ProductPage from "./pages/ProductPage/ProductPage";
import AboutUs from "./pages/AboutUs/AboutUs";
import Contact from "./pages/Contact/Contact";

// רכיב שמגן על הנתיבים — מאפשר גישה רק למשתמשים מחוברים
const PrivateRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.users.userInfo);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <div className="layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Calculator" element={<Calculator />} />
            <Route path="/propertysearch" element={<PropertySearch />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />

            {/* הגנה על הנתיב להוספת נכס - רק למשתמשים מחוברים */}
            <Route
              path="/add-product"
              element={
                <PrivateRoute>
                  <AddProduct />
                </PrivateRoute>
              }
            />

            {/* הגנה על הנתיב לניהול נכסים - רק למשתמשים מחוברים */}
            <Route
              path="/product-manager"
              element={
                <PrivateRoute>
                  <ProductManager />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
        <AccessibilityWidget />
      </div>
    </Router>
  );
};

export default App;
