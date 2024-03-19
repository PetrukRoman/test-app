export type UserData = {
  email: string;
  password: string;
};

export type Meal = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

export type CartMeal = Meal & {
  quantity: number;
};

export type OrderData = {
  userId: string | null;
  items: CartMeal[];
  address: string;
  payment: string;
};
