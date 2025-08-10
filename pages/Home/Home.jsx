import { useEffect, useState } from "react";
import HeaderVideo from "../../components/HeaderVideo/HeaderVideo";
import Products from "../ProductList/Products";
import "./Home.css";

const Home = () => {
  // יצירת state בשם showPopup, שמתחיל ב-true (הפופאפ יוצג בהתחלה)
  const [showPopup, setShowPopup] = useState(true);

  // useEffect עם מערך תלות ריק ([]) - ירוץ רק פעם אחת אחרי הטעינה הראשונית של הקומפוננטה
  useEffect(() => {
    // הגדרת טיימר שיסגור את הפופאפ לאחר 3 שניות (3000 מילישניות)
    const timer = setTimeout(() => setShowPopup(false), 3000);

    // פונקציית ניקוי (cleanup) שתבטל את הטיימר במקרה שהקומפוננטה תתפרק לפני שהטיימר מסתיים
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-container">
      {/* אם showPopup=true - מציג את הפופאפ */}
      {showPopup && (
        <div className="popup-wrapper">
          <div className="popup-message">
            <p>
              ברוכים הבאים ל־<strong>DUMUS LUX</strong>
              <br />
              אתר הנדל״ן הכי נפוץ בארץ!
            </p>
            {/* כפתור סגירה שמגדיר showPopup ל-false וכך מסתיר את הפופאפ */}
            <button onClick={() => setShowPopup(false)}>סגור</button>
          </div>
        </div>
      )}

      {/* קומפוננטת וידאו בראש הדף */}
      <HeaderVideo />

      {/* קומפוננטת רשימת המוצרים */}
      <Products />
    </div>
  );
};

export default Home;
