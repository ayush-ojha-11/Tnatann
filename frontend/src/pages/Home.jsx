import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Search, ShoppingBag, User, Star, Moon, Sun } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const categories = [
    { name: "Electronics", icon: "💻" },
    { name: "Vehicles", icon: "🚗" },
    { name: "Real Estate", icon: "🏡" },
    { name: "Fashion", icon: "👕" },
    { name: "Services", icon: "🛠️" },
    { name: "Others", icon: "➕" },
  ];

  const featuredListings = [
    {
      title: "iPhone 13 Pro",
      price: "₹90000",
      img: "/iphone13pro.png",
    },
    {
      title: "Harry Potter",
      price: "₹35000",
      img: "/hp.jpg",
    },
    {
      title: "MacBook Pro M1",
      price: "₹100000",
      img: "/mpm1.png",
    },
  ];

  const testimonials = [
    {
      name: "Aryan",
      review: "Tnatann helped me sell my car in 2 days!",
      rating: 5,
    },
    {
      name: "Smith",
      review: "Great platform to buy second-hand gadgets.",
      rating: 4,
    },
  ];

  useEffect(() => {
    if (authUser) {
      navigate("/products");
    }
  }, [authUser, navigate]);

  return (
    <div className={`min-h-screen text-base-content`}>
      {/* 🎯 Hero Section */}
      <header className="text-center py-16">
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">
          Buy & Sell Anything, Anytime!
          <br />
          <span className="bg-gradient-to-r from-pink-500 via-indigo-600 to-pink-500 p-1 bg-clip-text text-transparent">
            with Tnatann
          </span>
        </h1>

        {/* CTA Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            className="bg-blue-500 px-6 py-3 text-white rounded-lg flex items-center cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <User className="mr-2" /> Get Started
          </button>
        </div>
      </header>

      {/* 🛒 Categories */}
      <section className="text-center py-12 px-8">
        <h2 className="text-3xl font-semibold">Explore Categories</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mt-6">
          {categories.map((cat, index) => (
            <div key={index} className="p-4 bg-base-300 shadow rounded-lg">
              <span className="text-3xl">{cat.icon}</span>
              <p className="mt-2">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 Featured Listings */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-semibold">Featured Listings</h2>
        <div className="flex flex-wrap items-center justify-center">
          {featuredListings.map((product, index) => (
            <div key={index} className="p-4 bg-base-300 shadow rounded-lg m-6">
              <img
                src={product.img}
                alt={product.title}
                className="w-40 h-40 object-contain rounded"
              />
              <h3 className="text-lg mt-2">{product.title}</h3>
              <p className="text-green-600 font-bold">{product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ How It Works */}
      <section className="text-center py-12 px-8">
        <h2 className="text-3xl font-semibold">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="p-4 bg-base-300 shadow rounded-lg">
            <h3 className="text-lg font-semibold">1️⃣ Create an Account</h3>
            <p className="text-base-content">Sign up and start posting ads.</p>
          </div>
          <div className="p-4 bg-base-300 shadow rounded-lg">
            <h3 className="text-lg font-semibold">2️⃣ Post Your Ad</h3>
            <p className=" text-base-content">
              Add images and details to attract buyers.
            </p>
          </div>
          <div className="p-4 bg-base-300 shadow rounded-lg">
            <h3 className="text-lg font-semibold">
              3️⃣ Get Buyers & Sell Fast!
            </h3>
            <p className="text-base-content">
              Negotiate and complete transactions securely.
            </p>
          </div>
        </div>
      </section>

      {/* 💬 Testimonials */}
      <section className="text-center py-12 bg-base-300">
        <h2 className="text-3xl font-semibold">What Our Users Say</h2>
        <div className="flex justify-center space-x-6 mt-6">
          {testimonials.map((user, index) => (
            <div key={index} className="p-4 bg-base-300 shadow rounded-lg">
              <p className="text-lg">"{user.review}"</p>
              <p className="text-yellow-500 mt-2 flex justify-center">
                {Array(user.rating).fill(<Star size={16} />)}
              </p>
              <h3 className="font-semibold mt-2">{user.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
