import { useState, useEffect, useRef } from "react";
import "./AccessibilityWidget.css";

const AccessibilityWidget = () => {
  // סטייטים לניהול מצבים שונים
  const [open, setOpen] = useState(false); // האם הפאנל פתוח
  const [fontSize, setFontSize] = useState(16); // גודל טקסט
  const [darkMode, setDarkMode] = useState(false); // מצב כהה
  const [accessibleFont, setAccessibleFont] = useState(false); // גופן נגיש
  const [reduceMotion, setReduceMotion] = useState(false); // עצירת אנימציות
  const [isSpeaking, setIsSpeaking] = useState(false); // האם הקריינות פעילה

  // ייחוס לרכיבים בדף (DOM)
  //השורות הבאות עושות שימוש ב־
  //useRef מ־React
  //והן נועדו ליצור ייחוס
  //reference
  //לאובייקטים מסוימים בדף או בקוד
  //מבלי שיגרמו לרינדור מחודש של הקומפוננטה
  const panelRef = useRef(null); // ייחוס לפאנל עצמו
  const utteranceRef = useRef(null); // ייחוס לאובייקט הקריינות

useEffect(() => {
  // שליפה מה-localStorage של הגדרות שהמשתמש שמר

  // שליפת גודל הגופן (אם המשתמש בחר גודל מותאם אישית)
  const storedFontSize = localStorage.getItem("fontSize");

  // שליפת מצב כהה (true או false) ושמירה כתוצאה בוליאנית
  const storedDarkMode = localStorage.getItem("darkMode") === "true";

  // שליפת הגדרה אם הופעלה פונטים נגישים (true או false)
  const storedFont = localStorage.getItem("accessibleFont") === "true";

  // שליפת הגדרה אם המשתמש בחר להפחית תנועות ואנימציות
  const storedReduceMotion = localStorage.getItem("reduceMotion") === "true";

  // אם נמצא ערך עבור גודל גופן – המרה למספר ועדכון הסטייט
  if (storedFontSize) setFontSize(Number(storedFontSize));

  // עדכון מצב כהה לפי מה שנשמר
  setDarkMode(storedDarkMode);

  // עדכון הגדרת הפונט הנגיש לפי מה שנשמר
  setAccessibleFont(storedFont);

  // עדכון הגדרה להפחתת תנועה לפי מה שנשמר
  setReduceMotion(storedReduceMotion);
}, []);


  // כל שינוי בגודל הגופן מעדכן את localStorage ואת גודל הטקסט בפועל
  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
    document.documentElement.style.fontSize = fontSize + "px"; // משנה גודל טקסט בכל הדף
  }, [fontSize]);

  // כל שינוי במצב כהה משנה את body ומעדכן localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // גופן נגיש (אם מופעל – מוסיף class)
  useEffect(() => {
    localStorage.setItem("accessibleFont", accessibleFont);
    if (accessibleFont) {
      document.body.classList.add("accessible-font");
    } else {
      document.body.classList.remove("accessible-font");
    }
  }, [accessibleFont]);

  // עצירת אנימציות – מוסיף/מסיר class לפי הצורך
  useEffect(() => {
    localStorage.setItem("reduceMotion", reduceMotion);
    if (reduceMotion) {
      document.body.classList.add("reduce-motion");
    } else {
      document.body.classList.remove("reduce-motion");
    }
  }, [reduceMotion]);

  // כשסוגרים את הפאנל, עוצרים קריינות אם פועלת
  useEffect(() => {
    if (!open && isSpeaking) {
      stopSpeaking();
    }
  }, [open]);

  // איפוס כל ההגדרות + ניקוי localStorage
  const resetSettings = () => {
    setFontSize(16);
    setDarkMode(false);
    setAccessibleFont(false);
    setReduceMotion(false);
    stopSpeaking();
    localStorage.clear();
  };

  // התחלת קריינות
  const startSpeaking = () => {
    if (!("speechSynthesis" in window)) {
      alert("דפדפן זה לא תומך בקריינות");
      return;
    }
    // מבטל קריינות קיימת אם יש
    if (utteranceRef.current) {
      speechSynthesis.cancel();
      utteranceRef.current = null;
    }

    // תוכן שיקרא בקול: אם הפאנל פתוח – הטקסט שלו
    const text = panelRef.current
      ? panelRef.current.innerText
      : "אפשרויות נגישות";

    const utterance = new SpeechSynthesisUtterance(text); // יוצר אובייקט קריינות
    utterance.lang = "he-IL"; // מגדיר שפה לעברית
    utterance.onend = () => setIsSpeaking(false); // כשמסתיימת הקריינות, משנה סטייט

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance); // מפעיל קריינות
    setIsSpeaking(true);
  };

  // עצירת קריינות
  const stopSpeaking = () => {
    if (utteranceRef.current) {
      speechSynthesis.cancel();
      utteranceRef.current = null;
      setIsSpeaking(false);
    }
  };

  // הפעלת/עצירת קריינות לפי מצב נוכחי
  const toggleSpeaking = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      startSpeaking();
    }
  };

  // רנדר של כפתור נגישות + פאנל הגדרות
  return (
    <>
      {/* כפתור פתיחה/סגירה של הפאנל */}
      <button
        onClick={() => setOpen(!open)}
        className="accessibility-button"
        aria-label="תפריט נגישות"
      >
        ♿
      </button>

      {/* הפאנל מוצג רק אם open = true */}
      {open && (
        <div
          className="accessibility-panel"
          role="region"
          aria-label="אפשרויות נגישות"
          ref={panelRef}
          tabIndex={0} // מאפשר מיקוד מקלדת
        >
          {/* גודל טקסט */}
          <div className="accessibility-section">
            <label className="accessibility-label">גודל טקסט:</label>
            <div className="accessibility-controls">
              <button
                aria-label="הקטן טקסט"
                onClick={() => setFontSize((size) => Math.max(12, size - 2))}
              >
                -
              </button>
              <span>{fontSize}px</span>
              <button
                aria-label="הגדל טקסט"
                onClick={() => setFontSize((size) => Math.min(30, size + 2))}
              >
                +
              </button>
            </div>
          </div>

          {/* מצב כהה */}
          <div className="accessibility-section">
            <div className="accessibility-rtl-line">
              <label htmlFor="dark-mode-toggle">מצב כהה</label>
              <input
                id="dark-mode-toggle"
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
            </div>
          </div>

          {/* גופן נגיש */}
          <div className="accessibility-section">
            <div className="accessibility-rtl-line">
              <label htmlFor="font-toggle">גופן נגיש</label>
              <input
                id="font-toggle"
                type="checkbox"
                checked={accessibleFont}
                onChange={() => setAccessibleFont(!accessibleFont)}
              />
            </div>
          </div>

          {/* עצירת אנימציות */}
          <div className="accessibility-section">
            <div className="accessibility-rtl-line">
              <label htmlFor="reduce-motion-toggle">עצירת אנימציות</label>
              <input
                id="reduce-motion-toggle"
                type="checkbox"
                checked={reduceMotion}
                onChange={() => setReduceMotion(!reduceMotion)}
              />
            </div>
          </div>

          {/* קריינות */}
          <div className="accessibility-section">
            <button
              className="speech-button"
              onClick={toggleSpeaking}
              aria-pressed={isSpeaking}
              aria-label={isSpeaking ? "עצור קריינות" : "הפעל קריינות"}
            >
              {isSpeaking ? "■ עצור קריינות" : "▶ הפעל קריינות"}
            </button>
          </div>

          {/* איפוס הגדרות */}
          <div className="accessibility-section">
            <button
              className="reset-button"
              onClick={resetSettings}
              aria-label="איפוס הגדרות נגישות"
            >
              איפוס הגדרות נגישות
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// מייצא את הקומפוננטה לשימוש מחוץ לקובץ
export default AccessibilityWidget;
