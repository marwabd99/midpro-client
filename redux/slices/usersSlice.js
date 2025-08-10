import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk 1: התחברות משתמש

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (credentials, thunkAPI) => {
    try {
      // שליחת בקשת POST לשרת עם פרטי ההתחברות (אימייל וסיסמה)
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      // אם התגובה לא תקינה (כגון שגיאה בשרת או פרטים לא נכונים)
      if (!response.ok) {
        const errorData = await response.json();
        // rejectWithValue שולח את השגיאה ל־rejected כדי לטפל בה ברכיב
        return thunkAPI.rejectWithValue(errorData.message || "Login failed");
      }

      // אם התגובה תקינה - מקבלים את המידע (כולל הטוקן)
      const data = await response.json();

      // שמירת פרטי המשתמש ב־localStorage כדי לשמור על ההתחברות בין רענונים
      localStorage.setItem("userInfo", JSON.stringify(data));

      // מחזירים את המידע ל־Redux
      return data;
    } catch (error) {
      // במקרה של שגיאה ברשת או אחרת
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk 2: הרשמת משתמש חדש

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, thunkAPI) => {
    try {
      // שליחת בקשת POST לשרת עם פרטי הרשמה (אימייל וסיסמה)
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(
          errorData.message || "Registration failed"
        );
      }

      // אם ההרשמה הצליחה - מקבלים את פרטי המשתמש כולל הטוקן
      const data = await response.json();

      // שמירת פרטי המשתמש ב־localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// שליפת המשתמש המחובר מה־localStorage (אם קיים)

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;


// יצירת ה-slice לניהול סטייט המשתמש

const usersSlice = createSlice({
  name: "users",
  initialState: {
    userInfo: userInfoFromStorage, // אובייקט עם פרטי המשתמש (כולל token) או null
    loading: false, // מצב טעינה (האם בקשה לרשת פעילה)
    error: null, // הודעת שגיאה אם יש
  },
  reducers: {
    // פעולה להתנתקות המשתמש
    logout(state) {
      state.userInfo = null; // ניקוי המשתמש מהסטייט
      localStorage.removeItem("userInfo"); // הסרת המשתמש מהאחסון המקומי
      state.error = null; // איפוס שגיאות
      state.loading = false; // איפוס מצב טעינה
    },
  },
  extraReducers: (builder) => {
    builder
      // ===================
      // התחברות - שלבים שונים
      // ===================
      .addCase(loginUser.pending, (state) => {
        state.loading = true; // הבקשה נשלחה, ממתינים לתגובה
        state.error = null; // איפוס שגיאות קודמות
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false; // הבקשה הסתיימה בהצלחה
        state.userInfo = action.payload; // שמירת פרטי המשתמש בסטייט
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false; // הבקשה הסתיימה בכשלון
        state.error = action.payload || "שגיאה בהתחברות"; // הצגת הודעת שגיאה
      })

      // ===================
      // הרשמה - שלבים שונים
      // ===================
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "שגיאה בהרשמה";
      });
  },
});

// יצוא פעולות מתוך ה-slice (כדי להשתמש ב-logout ב-component)
export const { logout } = usersSlice.actions;

// יצוא ה-reducer לשימוש ב-store
export default usersSlice.reducer;
