import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* עוטף את כל תוכן הפוטר – מאפשר שליטה על פריסה בעיצוב */}
      <div className="footer-container">
        {/* קישורים פנימיים בתוך האתר */}
        <div className="footer-links">
          <Link to="/contact" className="footer-link">
            צור קשר {/* טקסט שיוצג למשתמש */}
          </Link>
          <Link to="/about-us" className="footer-link">
            מי אנחנו
          </Link>
        </div>
        <div className="footer-about">
          <p>DUMUS LUX חברה שמטרתה לספק את השירותים הטובים ביותר ללקוחותינו.</p>
          <p>כל הזכויות שמורות © 2025</p>
        </div>

        {/* אייקונים של רשתות חברתיות (קישורים חיצוניים) */}
        <div className="footer-social">
          {/* אינסטגרם */}
          <a
            href="https://instagram.com" // קישור חיצוני
            target="_blank" // פותח בלשונית חדשה
            rel="noreferrer" // הגנה על פרטיות
            aria-label="Instagram" // נגישות – תיאור לקריינות
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
              alt="Instagram" // תיאור חלופי לתמונה
              className="footer-img-icon" // מאפשר עיצוב מותאם
            />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="footer-img-icon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
