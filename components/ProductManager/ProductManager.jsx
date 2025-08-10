import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductManager.css";

import {
  fetchProducts,
  addProduct,
  deleteProduct,
} from "../../redux/slices/productsSlice";

const ProductManager = () => {
  const dispatch = useDispatch(); // מאפשר לשלוח פעולות ל-Redux
  const { items: products } = useSelector((state) => state.products); // שולף את רשימת הנכסים מה-Redux

  // State מקומי לטופס הוספת נכס חדש
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    location: "",
    price: "",
    rooms: "",
    hasPool: false,
    description: "",
  });

  // בעת טעינת הרכיב, שולף את רשימת הנכסים מהשרת / החנות
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // פונקציה לטיפול בהוספת נכס חדש כאשר שולחים את הטופס
  const handleAdd = (e) => {
    e.preventDefault(); // מונע רענון אוטומטי של הדף בעת שליחת הטופס

    // שולח את הנכס החדש ל-Redux / שרת
    dispatch(addProduct(newProduct));

    // מאפס את ערכי הטופס לאחר הוספה כדי שנוכל להוסיף נכס נוסף בקלות
    setNewProduct({
      name: "",
      image: "",
      location: "",
      price: "",
      rooms: "",
      hasPool: false,
      description: "",
    });
  };

  // פונקציה למחיקת נכס לפי מזהה (id)
  const handleDelete = (id) => {
    if (window.confirm("את בטוחה שתרצי למחוק את הנכס?")) {
      dispatch(deleteProduct(id)); // שולח פעולה למחיקת הנכס
    }
  };

  return (
    <div className="product-manager">
      <h2>ניהול נכסים</h2>

      {/* טופס הוספת נכס חדש */}
      <form onSubmit={handleAdd} className="add-product-form">
        {/* שדה להזנת שם הנכס */}
        <input
          type="text"
          placeholder="שם נכס"
          value={newProduct.name} // הערך שנמצא ב-state
          onChange={
            (e) => setNewProduct({ ...newProduct, name: e.target.value }) // עדכון השדה ב-state
          }
          required // שדה חובה
        />

        {/* שדה להזנת כתובת תמונה */}
        <input
          type="text"
          placeholder="כתובת תמונה (URL)"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
        />

        {/* שדה להזנת מיקום הנכס */}
        <input
          type="text"
          placeholder="מיקום"
          value={newProduct.location}
          onChange={(e) =>
            setNewProduct({ ...newProduct, location: e.target.value })
          }
          required
        />

        {/* שדה להזנת מחיר הנכס */}
        <input
          type="number"
          placeholder="מחיר"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          required
          min="0" // המחיר לא יכול להיות שלילי
        />

        {/* שדה להזנת מספר חדרים */}
        <input
          type="number"
          placeholder="מספר חדרים"
          value={newProduct.rooms}
          onChange={(e) =>
            setNewProduct({ ...newProduct, rooms: e.target.value })
          }
          required
          min="0"
        />

        {/* Checkbox עבור קיום בריכה בנכס */}
        <label>
          <input
            type="checkbox"
            checked={newProduct.hasPool} // ערך הבוליאני
            onChange={
              (e) => setNewProduct({ ...newProduct, hasPool: e.target.checked }) // עדכון ערך
            }
          />
          בריכה
        </label>

        {/* שדה טקסט ארוך לתיאור הנכס */}
        <textarea
          placeholder="תיאור"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />

        {/* כפתור לשליחת הטופס */}
        <button type="submit">הוסף נכס</button>
      </form>

      {/* רשימת נכסים קיימים */}
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id} className="product-item">
            <strong>{product.name}</strong> - {product.location}
            <button onClick={() => handleDelete(product._id)}>🗑 מחק</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManager;
