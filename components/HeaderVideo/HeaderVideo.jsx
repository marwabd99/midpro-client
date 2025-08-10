import "./HeaderVideo.css";

// קומפוננטה שמציגה וידאו רקע בכותרת (header)
const HeaderVideo = () => {
  return (
    <div className="video-container">
      {/* תגית וידאו עם מאפיינים:
          - autoPlay: מפעיל את הוידאו אוטומטית כשהרכיב נטען
          - muted: שקט (ללא סאונד) - חובה ברוב הדפדפנים להפעלת וידאו אוטומטי
          - loop: מייצר לולאה (הוידאו יתחיל מחדש אוטומטית כשהסתיים)
          - playsInline: מאפשר לנגן וידאו בתוך ה-element בלי לעבור למסך מלא בטלפונים ניידים */}
      <video className="background-video" autoPlay muted loop playsInline>
        <source src="/videos/vid.mp4" type="video/mp4" />
        {/* טקסט שיתקבל אם הדפדפן לא תומך בתגית וידאו */}
        הדפדפן שלך לא תומך בוידאו.
      </video>
    </div>
  );
};

export default HeaderVideo;
