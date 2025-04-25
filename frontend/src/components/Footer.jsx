import { Link } from "react-router-dom";
import { APP_NAME } from "../constants/constants";
const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold text-white">{APP_NAME}</h2>
          <p className="mt-2 text-gray-400">Buy & Sell Easily</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-title text-lg text-white">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link className="link link-hover" to={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to={"/products"}>
                Products
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to={"/login"}>
                Login
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to={"/register"}>
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="footer-title text-lg text-white">Follow Us</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a className="link link-hover">Facebook</a>
            </li>
            <li>
              <a className="link link-hover">Twitter</a>
            </li>
            <li>
              <a className="link link-hover">Instagram</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="footer-title text-lg text-white">Contact</h3>
          <p className="mt-2 text-gray-400">tnatann24@gmail.com</p>
          <p className="text-gray-400">+123 456 7890</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
