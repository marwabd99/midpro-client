import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/usersSlice";
import "../LogInPage/LogIn.css";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // הגדרה נכונה של userInfo מתוך Redux
  const { userInfo, loading, error } = useSelector((state) => state.users);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userInfo) {
      // אפשר לנווט אוטומטית או לא
      // navigate("/add-product");
    }
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <div className="LogIn-container">
      <h2>התחברות</h2>

      <form onSubmit={handleSubmit} className="LogIn-form">
        <input
          type="email"
          name="email"
          placeholder="אימייל"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="סיסמה"
          value={form.password}
          onChange={handleChange}
          required
        />

        <div className="forgot-password">
          <Link to="/forgot-password">שכחת סיסמה?</Link>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "טוען..." : "התחבר"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <p className="signup-link">
        עדיין אין לך חשבון? <Link to="/signup">להרשמה</Link>
      </p>

      {userInfo && (
        <button
          onClick={() => {
            navigate("/add-product");
          }}
        >
          הוסף נכס חדש
        </button>
      )}
    </div>
  );
};

export default LogIn;
