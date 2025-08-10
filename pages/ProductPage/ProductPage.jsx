import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import data from "../../data/products.json";

const ProductPage = () => {
  // קריאה לפרמטר 'id' מתוך כתובת ה-URL (לדוגמה /product/123)
  const { id } = useParams();
  //מאפשר לנו לקבל את הפרמטרים מתוך כתובת ה-URL
  // יצירת state לאחסון פרטי המוצר שנמצא
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // מחפשים במערך הנתונים מוצר שה-id שלו שווה לפרמטר מהכתובת
    const found = data.find((item) => item.id.toString() === id);
    setProduct(found);
  }, [id]);
  // הרצה מחדש של useEffect רק כש-id משתנה

  // אם המוצר עדיין לא נטען (null), מציגים טקסט טעינה
  if (!product) return <p>טוען נכס...</p>;

  // הצגה מפורטת של פרטי המוצר
  return (
    <div className="product-details">
      <h1>{product.name}</h1>

      {/* עוטף לתמונה */}
      <div className="product-image-wrapper">
        {/* תמונת הנכס עם אלט טקסט לאפשרות נגישות */}
        <img src={product.image} alt={product.name} />
      </div>

      {/* מידע נוסף על המוצר */}
      <div className="product-info">
        <p>
          <strong>מיקום:</strong> {product.location}
        </p>
        <p>
          <strong>מחיר:</strong> {product.price} 
        </p>
        <p>
          <strong>תיאור:</strong> {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
