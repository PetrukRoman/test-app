import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ModalProvider from "./context/modalContext.tsx";
import AuthProvider from "./context/AuthContext.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import "./i18n";
import Loader from "./components/Loader/Loader.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ModalProvider>
        <Provider store={store}>
          <Suspense fallback={<Loader />}>
            <App />
          </Suspense>
        </Provider>
      </ModalProvider>
    </AuthProvider>
  </React.StrictMode>
);
