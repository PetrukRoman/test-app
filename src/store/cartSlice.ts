import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartMeal, Meal } from "../types";

type CartState = {
  items: CartMeal[];
  subTotal: number;
};

const initialState: CartState = {
  items: [],
  subTotal: 0,
};

type changeQuantityPayload = {
  type: "increment" | "decrement";
  id: string;
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Meal>) => {
      state.items.push({
        ...action.payload,
        quantity: 1,
      });

      state.subTotal = state.items.reduce((acc, curr) => (acc += curr.price * curr.quantity), 0);
    },
    changeQuantity: (state, action: PayloadAction<changeQuantityPayload>) => {
      const currentItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (action.payload.type === "decrement") {
        if (state.items[currentItemIndex].quantity === 1) {
          state.items.splice(currentItemIndex, 1);
        } else {
          state.items[currentItemIndex].quantity--;
        }
      } else {
        state.items[currentItemIndex].quantity++;
      }

      state.subTotal = state.items.reduce((acc, curr) => (acc += curr.price * curr.quantity), 0);
    },
    clearCart: () => {
      return initialState;
    },
  },
});

export const { addToCart, changeQuantity, clearCart } = counterSlice.actions;

export default counterSlice.reducer;
