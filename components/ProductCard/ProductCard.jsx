import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

const ProductCard = ({
  product, // המוצר עצמו – כולל id, name, image וכו'
  toggleDescription, // פונקציה להצגת/הסתרת תיאור
  expandedIds, // מערך מזהים של מוצרים שתיאורם פתוח
  styleParent, // בוליאן – האם לאפשר תיאור מתרחב
}) => {
  return (
    <div className={styles.card}>
      {/* לחיצה על כל הכרטיס תעביר לדף פרטי המוצר לפי מזהה */}
      <Link to={`/products/${product.id}`} className={styles.cardLink}>
        <img src={product.image} alt={product.name} className={styles.image} />
        {/* טקסט חלופי שייוצג אם התמונה לא נטענת. */}
        {/* שם המוצר */}
        <h2 className={styles.name}>{product.name}</h2>
        {/* מחיר בשקלים */}
        <p className={styles.price}>{product.price}</p>
        {/* מיקום */}
        <p>
          <strong>מיקום:</strong> {product.location}
        </p>
        {/* מספר חדרים */}
        <p>
          <strong>חדרים:</strong> {product.rooms}
        </p>
        {/* האם יש בריכה */}
        <p>
          <strong>בריכה:</strong> {product.hasPool ? "כן" : "לא"}
        </p>
      </Link>

      {/* רק אם כל התנאים מתקיימים – נציג כפתור להצגת תיאור */}
      {styleParent && toggleDescription && expandedIds && (
        <>
          {/* כפתור להצגת/הסתרת התיאור */}
          <button
            className={styles.showDescButton}
            onClick={() => toggleDescription(product.id)}
          >
            {expandedIds.includes(product.id) ? "הסתר תיאור" : "הצג תיאור"}
          </button>
          {/* אם המוצר נמצא ברשימת המורחבים – מציגים תיאור */}
          {expandedIds.includes(product.id) && (
            <p className={styles.description}>{product.description}</p>
          )}
          {/* includes-בודק את המערך ומחזיר ערך בוליאני */}
        </>
      )}
      <Link to="/contact" className={styles.button}>
        צור קשר
      </Link>
    </div>
  );
};

export default ProductCard;
