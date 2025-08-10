import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch - שליפת כל הנכסים

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) {
        const errorData = await res.json();
        return thunkAPI.rejectWithValue(
          errorData.message || "Error fetching products"
        );
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Add - הוספת נכס חדש

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct, thunkAPI) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) {
        const errorData = await res.json();
        return thunkAPI.rejectWithValue(
          errorData.message || "Error adding product"
        );
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete - מחיקת נכס לפי מזהה

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        return thunkAPI.rejectWithValue(
          errorData.message || "Error deleting product"
        );
      }
      // מחזיר את מזהה המוצר כדי לעדכן את ה-state
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// יצירת ה-slice לנכסים

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [], // רשימת הנכסים
    status: "idle", // מצב הפעולה הכללי: idle/loading/succeeded/failed
    error: null, // הודעות שגיאה אם יש
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // -------------------------------
      // טיפול ב-fetchProducts
      // -------------------------------
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "שגיאה בטעינת הנכסים";
      })

      // -------------------------------
      // טיפול ב-addProduct
      // -------------------------------
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload); // הוספת הנכס החדש לרשימה
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "שגיאה בהוספת הנכס";
      })

      // -------------------------------
      // טיפול ב-deleteProduct
      // -------------------------------
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        // מחיקת הנכס מהרשימה לפי המזהה
        state.items = state.items.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "שגיאה במחיקת הנכס";
      });
  },
});

export default productsSlice.reducer;
