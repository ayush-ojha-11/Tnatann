import { useAuthStore } from "../store/useAuthStore.js";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Loader2, User2, Mail, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import AuthImagePattern from "../components/skeletons/AuthImagePattern.jsx";
import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";

export const Register = () => {
  const navigate = useNavigate();
  const { register, isRegistering, authUser } = useAuthStore();

  const [countries] = useState(Country.getAllCountries());
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    state: "",
    city: "",
    tehsil: "",
  });

  const validateForm = () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      return toast.error("All fields are required!");
    }
    if (!formData.country || !formData.state || !formData.city) {
      return toast.error("Fill your complete location");
    }
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() === true) {
      register(formData);
    }
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setStates(State.getStatesOfCountry(country.isoCode));
    setFormData({ ...formData, country: country.name });
    setCities([]);
  };

  const handleStateChange = (state) => {
    setFormData({ ...formData, state: state.name });
    setSelectedState(state); // async
    if (state && selectedCountry) {
      const cities = City.getCitiesOfState(
        selectedCountry.isoCode,
        state.isoCode
      );
      setCities(cities);
      console.log(selectedCountry, state);
    } else {
      setCities([]);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                <User2 className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get Started with us</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center z-10">
                  <User2 className="size-5" />
                </div>

                <input
                  type="text"
                  className="input input-bordered w-full pl-10 relative"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>
            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center z-10">
                  <Mail className="size-5" />
                </div>

                <input
                  type="text"
                  className="input input-bordered w-full pl-10 relative"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute flex inset-y-0 left-3 items-center z-10">
                  <Lock className="size-5" />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="input input-bordered w-full relative pl-10"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="size-5 text-base-content/40" />
                  ) : (
                    <EyeOff className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            {/* select options */}

            <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
              <select
                className="select select-bordered"
                onChange={(e) =>
                  handleCountryChange(
                    countries.find((c) => c.isoCode === e.target.value)
                  )
                }
              >
                <option value="">Country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>

              <select
                disabled={!selectedCountry}
                className="select select-bordered"
                onChange={(e) =>
                  handleStateChange(
                    states.find((s) => s.isoCode === e.target.value)
                  )
                }
              >
                <option>State</option>
                {states?.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>

              <select
                disabled={!selectedState}
                className="select select-bordered"
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              >
                <option>City</option>
                {cities?.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* location */}

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Tehsil</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center z-10">
                  <MapPin className="size-5" />
                </div>

                <input
                  type="text"
                  className="input input-bordered w-full pl-10 relative"
                  placeholder="Tehsil"
                  value={formData.tehsil}
                  onChange={(e) =>
                    setFormData({ ...formData, tehsil: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isRegistering}
            >
              {isRegistering ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to={"/login"} className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title={"Buy. Sell. Connect"}
        subtitle={"Buy. Sell. Connect. – Your Marketplace, Your Deals!"}
      />
    </div>
  );
};

export default Register;
