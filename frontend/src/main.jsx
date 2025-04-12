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
import About from "./pages/About.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import EditAd from "./pages/EditAd.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import ManageProducts from "./pages/admin/ManageProducts.jsx";
import ManageSellers from "./pages/admin/ManageSellers.jsx";
import AdminHome from "./pages/admin/AdminHome.jsx";

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
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
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
        element: <SellerDashboard />,
      },
      {
        path: "editAd",
        element: <EditAd />,
      },
      {
        path: "admin",
        element: <ProtectedRoute role="admin" />,
        children: [
          {
            path: "",
            element: <AdminLayout />,
            children: [
              {
                path: "",
                element: <AdminHome />,
              },
              {
                path: "users",
                element: <ManageUsers />,
              },
              {
                path: "products",
                element: <ManageProducts />,
              },
              {
                path: "sellers",
                element: <ManageSellers />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
