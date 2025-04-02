import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Products from "./pages/Products.jsx";
import PostAd from "./pages/PostAd.jsx";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProductDetails from "./pages/ProductDetails.jsx";
import SellerDashboard from "./pages/SellerDashboard.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/post-ad",
        element: <ProtectedRoute role="seller" />,
        children: [{ path: "", element: <PostAd /> }],
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/seller-dashboard",
        element: <ProtectedRoute role="seller" />,
        children: [{ path: "", element: <SellerDashboard /> }],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
