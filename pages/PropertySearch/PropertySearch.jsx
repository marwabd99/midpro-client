import React, { useState } from "react";
import properties from "../../data/products.json";
import styles from "./PropertySearch.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";

const PropertySearch = () => {
  // state לאחסון מסננים: מיקום, חדרים, בריכה
  const [filters, setFilters] = useState({
    location: "",
    rooms: "",
    hasPool: "",
  });

  // state לאחסון רשימת id של נכסים עם תיאור מורחב (למשל להרחבת טקסט)
  const [expandedIds, setExpandedIds] = useState([]);

  // טיפול בשינוי במסננים (בחירת המשתמש)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    // מעדכן את המסנן המתאים לשם השדה (location, rooms, hasPool)
  };

  // איפוס המסננים ורשימת המורחבים
  const handleReset = () => {
    setFilters({ location: "", rooms: "", hasPool: "" });
    setExpandedIds([]);
  };

  // פונקציה להפעלת/כיבוי הצגת תיאור מורחב לנכס לפי id
  const toggleDescription = (id) => {
    // אם ה-id כבר נמצא במערך expandedIds - מסיר אותו (סוגר את התיאור)
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((item) => item !== id));
    } else {
      // אם לא נמצא - מוסיף אותו (פותח את התיאור)
      setExpandedIds([...expandedIds, id]);
    }
  };

  // סינון הנכסים לפי המסננים
  const filteredProperties = properties.filter((property) => {
    return (
      // מסנן לפי מיקום (או לא מסנן אם ריק)
      (filters.location === "" || property.location === filters.location) &&
      // מסנן לפי מספר חדרים (ממיר מחרוזת למספר)
      (filters.rooms === "" || property.rooms === parseInt(filters.rooms)) &&
      // מסנן לפי בריכה (משווה בוליאני לפי מחרוזת "true" או "false")
      (filters.hasPool === "" ||
        property.hasPool === (filters.hasPool === "true"))
    );
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>חיפוש נכסים</h2>

      {/* מסננים */}
      <div className={styles.filters}>
        {/* בחירת מיקום */}
        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
        >
          <option value="">--בחר מיקום--</option>
          <option value="תל אביב">תל אביב</option>
          <option value="חיפה">חיפה</option>
          <option value="הרצליה">הרצליה</option>
          <option value="קיסריה">קיסריה</option>
        </select>

        {/* בחירת מספר חדרים */}
        <select name="rooms" value={filters.rooms} onChange={handleChange}>
          <option value="">--מס' חדרים--</option>
          {[2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>

        {/* בחירת בריכה */}
        <select name="hasPool" value={filters.hasPool} onChange={handleChange}>
          <option value="">--בריכה--</option>
          <option value="true">יש</option>
          <option value="false">אין</option>
        </select>
      </div>

      {/* כפתור איפוס */}
      <div className={styles.resetButtonContainer}>
        <button className={styles.button} onClick={handleReset}>
          נקה
        </button>
      </div>

      {/* כותרת לתוצאות */}
      <div className={styles.resultsTitle}>נכסים מתאימים:</div>

      {/* רשימת כרטיסי הנכסים המסוננים */}
      <div className={styles.cards}>
        {/* הודעה אם אין תוצאות */}
        {filteredProperties.length === 0 && (
          <p className={styles.noResults}>לא נמצאו נכסים התואמים לחיפוש.</p>
        )}

        {/* מעבר על נכסים מסוננים */}
        {filteredProperties.map((property) => (
          <ProductCard
            key={property.id}
            product={property}
            toggleDescription={toggleDescription}
            expandedIds={expandedIds}
            styleParent={styles}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertySearch;
