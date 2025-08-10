import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("הסיסמאות לא תואמות");
      return;
    }

    try {
      // שליחת הנתונים לשרת (נתיב לדוגמה: /api/users/register)
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // שמירה של המשתמש (למשל token) אם צריך:
        localStorage.setItem("userInfo", JSON.stringify(data));

        // ניתוב לעמוד הוספת נכס
        navigate("/add-product");
      } else {
        alert(data.message || "שגיאה בהרשמה");
      }
    } catch (error) {
      console.error("שגיאה בשרת:", error);
      alert("אירעה שגיאה בעת ההרשמה");
    }
  };

  return (
    <div className="signup-container">
      <h2>הרשמה</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="name"
          placeholder="שם מלא"
          value={form.name}
          onChange={handleChange}
          required
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="אישור סיסמה"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">הירשם</button>
      </form>
      <p>
        כבר יש לך חשבון? <a href="/login">התחבר כאן</a>
      </p>
    </div>
  );
};

export default SignUp;
