import { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  // יצירת סטייטים לקלטים של המשתמש: סכום ההלוואה, ריבית, משך החזר, והחזר חודשי
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  // פונקציית חישוב החזר חודשי
  const calculate = () => {
    const principal = parseFloat(loanAmount); // סכום ההלוואה
    const annualInterest = parseFloat(interestRate) / 100; // ריבית שנתית באחוזים → עשרונית
    const numberOfPayments = parseFloat(years) * 12; // משך ההחזר בחודשים
    const monthlyInterest = annualInterest / 12; // ריבית חודשית

    // אם הריבית אפס (אין ריבית) – חישוב פשוט של סכום חלקי מספר חודשים
    if (monthlyInterest === 0) {
      const payment = principal / numberOfPayments;
      setMonthlyPayment(payment.toFixed(2)); // שמירה עם 2 ספרות אחרי הנקודה
      return;
    }

    // חישוב לפי נוסחת הלוואה רגילה (ריבית חודשית)
    const payment =
      (principal *
        monthlyInterest *
        Math.pow(1 + monthlyInterest, numberOfPayments)) /
      (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);

    setMonthlyPayment(payment.toFixed(2)); // שמירת ההחזר החודשי המעוגל
  };

  return (
    <div className="calculator">
      <h2>מחשבון משכנתא</h2>

      {/* קלט: סכום ההלוואה */}
      <div className="form-group">
        <label>סכום ההלוואה (ש"ח):</label>
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
      </div>

      {/* קלט: ריבית שנתית */}
      <div className="form-group">
        <label>ריבית שנתית (%):</label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
      </div>

      {/* קלט: משך ההחזר בשנים */}
      <div className="form-group">
        <label>משך ההחזר (שנים):</label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
        />
      </div>

      {/* כפתור לחישוב */}
      <button onClick={calculate}>חשב</button>

      {/* הצגת התוצאה אם קיימת */}
      {monthlyPayment && (
        <div className="result">
          <h3>החזר חודשי: ₪{monthlyPayment}</h3>
        </div>
      )}
    </div>
  );
};

export default Calculator;
