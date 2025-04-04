import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
const App = () => {
  const location = useLocation();

  const renderNavbar = () => {
    if (location.pathname === "/seller-dashboard") return;
    else return <Navbar />;
  };
  return (
    <div>
      {renderNavbar()}
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
