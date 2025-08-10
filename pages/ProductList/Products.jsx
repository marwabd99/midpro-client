import products from "../../data/products.json";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Products.module.css";

const Products = () => {
  return (
    // קונטיינר ראשי עם מחלקת עיצוב מ-CSS Modules
    <div className={styles.container}>
      {/* כותרת ראשית */}
      <h1 className={styles.title}> רשימת נכסים מומלצים</h1>

      {/* רשת של כרטיסים */}
      <div className={styles.grid}>
        {/* מעבר על כל המוצרים במערך */}
        {products.map((product) => (
          <ProductCard
            key={product.id} // מפתח ייחודי ל-React לשיפור ביצועים
            product={product} // העברת אובייקט הנכס כפרופס לכרטיס
          />
        ))}
      </div>
    </div>
  );
};
export default Products;
