import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/queryClient";
import Root from "./pages/Root/Root";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Order from "./pages/Order/Order";
import Orders from "./pages/Orders/Orders";
import ProtectedRoute from "./components/ProtecteRoute/ProtectedRoute";
import ErrorPage from "./pages/404/ErrorPage";

function App() {
  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/menu",
              element: <Menu />,
            },
            {
              path: "/orders",
              element: <Orders />,
            },
          ],
        },

        {
          path: "/order",
          element: <Order />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
