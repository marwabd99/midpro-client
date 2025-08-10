import { Link } from "react-router-dom"; 
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      {/* עוטף את כל שורת הניווט */}
      <div className="navbar-logo">
        {/* אזור הלוגו */}
        {/* לוגו שהוא קישור לעמוד הבית, עם גלילה לראש הדף */}
        <Link
          to="/"
          className="logo-text"
          onClick={() => window.scrollTo(0, 0)} // גלילה לראש הדף בעת לחיצה
        >
          Domus Lux
        </Link>
      </div>
      <nav className="nav-links">
        {/* קישורים לתפריט */}
        {/* קישור לעמוד הבית עם גלילה לראש הדף */}
        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
          בית
        </Link>
        {/* קישור לעמוד חיפוש נכסים */}
        <Link to="/PropertySearch">חיפוש נכסים</Link>
        {/* קישור למחשבון משכנתא */}
        <Link to="/Calculator">מחשבון משכנתא</Link>
        {/* אזור התחברות/הרשמה */}
        <div className="auth-links">
          <Link to="/login">התחברות</Link>
          <span className="separator"> | </span> {/* מפריד בין הקישורים */}
          <Link to="/SignUp">הרשמה</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
