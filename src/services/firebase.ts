import { initializeApp } from "firebase/app";

import { User, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { OrderData, UserData } from "../types";

const firebaseConfig = {
  apiKey: "AIzaSyBPNymj2l12_JVGLcOuISG4O7eiwCiLj14",
  authDomain: "order-app-20aff.firebaseapp.com",
  projectId: "order-app-20aff",
  storageBucket: "order-app-20aff.appspot.com",
  messagingSenderId: "709823760231",
  appId: "1:709823760231:web:54ee4cf6966f967f6551c2",
  measurementId: "G-G3C5W0EXW0",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const signUpUser = async (userData: UserData): Promise<User> => {
  const response = createUserWithEmailAndPassword(auth, userData.email, userData.password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((err) => {
      const error = new Error("Error");
      error.message = err.message;
      throw error;
    });

  return response;
};
export const logInUser = async (userData: UserData): Promise<User> => {
  const response = signInWithEmailAndPassword(auth, userData.email, userData.password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((err) => {
      const error = new Error("Error");
      error.message = err.message;
      throw error;
    });

  return response;
};

export const getAllMeals = async (token: string, pageParam: string) => {
  let url: string;
  if (pageParam === "") {
    url = `https://order-app-20aff-default-rtdb.firebaseio.com/meals.json?orderBy="$key"&limitToFirst=8&auth=${token}`;
  } else {
    url = `https://order-app-20aff-default-rtdb.firebaseio.com/meals.json?orderBy="$key"&startAfter="${pageParam}"&limitToFirst=8&auth=${token}`;
  }

  const responce = await fetch(url);
  if (!responce.ok) {
    const error = new Error("Error");
    const data = await responce.json();
    error.message = data.error;
    throw error;
  }

  return responce.json();
};

export const createOrder = async (token: string, data: OrderData): Promise<string> => {
  const url = "https://order-app-20aff-default-rtdb.firebaseio.com/orders.json?auth=" + token;

  const responce = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order_number: { ".sv": "timestamp" },
      ...data,
    }),
  });

  if (!responce.ok) {
    const error = new Error("Error");
    const data = await responce.json();
    error.message = data.error;

    throw error;
  }

  const { name } = await responce.json();

  const order_number = await getOrderNumber(name, token);
  return order_number;
};

export const getOrderNumber = async (name: string, token: string) => {
  const url = `https://order-app-20aff-default-rtdb.firebaseio.com/orders/${name}.json?auth=${token}`;
  const responce = await fetch(url);

  if (!responce.ok) {
    const error = new Error("Error");
    const data = await responce.json();
    error.message = data.error;
    throw error;
  }

  const { order_number } = await responce.json();

  return order_number;
};

export const getAllOrdersByUser = async (token: string | null, userId: string | null) => {
  console.log(userId);
  const responce = await fetch(`https://order-app-20aff-default-rtdb.firebaseio.com/orders.json?orderBy="userId"&equalTo="${userId}"&auth=${token}`);

  if (!responce.ok) {
    const error = new Error("Error");
    const data = await responce.json();
    error.message = data.error;
    throw error;
  }

  const data = await responce.json();

  return Object.keys(data).map((id) => ({
    ...data[id],
  }));
};
