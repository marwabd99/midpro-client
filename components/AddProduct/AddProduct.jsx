import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/slices/productsSlice";
import "./AddProduct.css";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // מצב מקומי לשדות הטופס
  const [product, setProduct] = useState({
    name: "",
    image: "",
    location: "",
    price: "",
    rooms: "",
    hasPool: false,
    description: "",
  });

  // מצב להצגת כפתור ניהול נכסים לאחר הוספה
  const [showManageButton, setShowManageButton] = useState(false);

  // טיפול בשינוי שדות הטופס
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // טיפול בהגשת הטופס - הוספת נכס
  const handleSubmit = (e) => {
    e.preventDefault();

    // אפשרות לבדוק תקינות לפני שליחה (לדוגמה, שם ומיקום חובה)
    if (!product.name.trim() || !product.location.trim()) {
      toast.error("אנא מלא/י את כל השדות החיוניים");
      return;
    }

    // שליחה ל-Redux (הוספת נכס)
    dispatch(addProduct(product));

    // הצגת כפתור "ניהול נכסים"
    setShowManageButton(true);

    // איפוס הטופס
    setProduct({
      name: "",
      image: "",
      location: "",
      price: "",
      rooms: "",
      hasPool: false,
      description: "",
    });
  };

  // ניווט לדף ניהול נכסים
  const goToManager = () => {
    navigate("/product-manager");
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <h1 className="form-title">הוספת נכס חדש</h1>

      <input
        type="text"
        name="name"
        placeholder="שם הנכס"
        value={product.name}
        onChange={handleChange}
        required
        className="form-input"
      />
      <input
        type="text"
        name="image"
        placeholder="קישור לתמונה"
        value={product.image}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="text"
        name="location"
        placeholder="מיקום"
        value={product.location}
        onChange={handleChange}
        required
        className="form-input"
      />
      <input
        type="text"
        name="price"
        placeholder="מחיר"
        value={product.price}
        onChange={handleChange}
        required
        className="form-input"
      />
      <input
        type="number"
        name="rooms"
        placeholder="מספר חדרים"
        value={product.rooms}
        onChange={handleChange}
        required
        className="form-input"
      />

      <label className="form-label">
        <input
          type="checkbox"
          name="hasPool"
          checked={product.hasPool}
          onChange={handleChange}
          className="form-checkbox"
        />
        בריכה
      </label>

      <textarea
        name="description"
        placeholder="תיאור הנכס"
        value={product.description}
        onChange={handleChange}
        className="form-textarea"
      />

      <button type="submit" className="form-button">
        הוסף נכס
      </button>

      {/* כפתור שיופיע רק אחרי הוספת נכס */}
      {showManageButton && (
        <button
          type="button"
          onClick={goToManager}
          className="form-button"
          style={{ marginTop: "1rem", backgroundColor: "#4CAF50" }}
        >
          ניהול נכסים
        </button>
      )}
    </form>
  );
};

export default AddProduct;
