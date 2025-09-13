import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Briefcase,
  Clock,
  Eye,
  EyeOff,
  UserCheck,
  Scale,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { initializeTheme } from '../store/slices/themeSlice';
import type { RootState } from '../store';

interface RegisterFormProps {
  type: "user" | "lawyer";
}

interface FormData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  country: string;
  specialization?: string;
  availableFrom?: string;
  availableTo?: string;
  charge?:string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isDark } = useAppSelector((state: RootState) => state.theme);
  
  const [formData, setFormData] = useState<FormData>({  
    name: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    specialization: "",
    availableFrom: "",
    availableTo: "",
    charge:""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    if (type === "lawyer") {
      if (!formData.phone?.trim()) newErrors.phone = "Phone is required";
      if (!formData.specialization?.trim())
        newErrors.specialization = "Specialization is required";
      if (!formData.availableFrom?.trim())
        newErrors.availableFrom = "Available from time is required";
      if (!formData.availableTo?.trim())
        newErrors.availableTo = "Available to time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      if (type === "user") {
        try {
          const response = await fetch(
            "http://localhost:3003/api/v1/users/register",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            }
          );

          const data = await response.json();

          if (response.ok) {
            console.log("User registered:", data.user);
            navigate("/userDashboard");
          } else {
            alert(data.message || "Something went wrong");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Server error. Try again later.");
        }
      } else {
        try {
          const response = await fetch(
            "http://localhost:3003/api/v1/lawyers/register",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            }
          );

          const data = await response.json();

          if (response.ok) {
            console.log("Lawyer registered:", data.lawyer);
            navigate("/dashboard");
          } else {
            alert(data.error || "Something went wrong");
          }
        } catch (err) {
          console.error("Error:", err);
          alert("Server error. Please try again later.");
        }
      }
    }
  };

  const inputClass = (fieldName: keyof FormData) =>
    `w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
      errors[fieldName]
        ? "border-red-300 bg-red-50"
        : "border-gray-200 bg-gray-50 hover:bg-white focus:bg-white"
    }`;

  const countries = [
    "India",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Sweden",
    "Other",
  ];

  const specializations = [
    "Corporate Law",
    "Criminal Law",
    "Family Law",
    "Immigration Law",
    "Personal Injury",
    "Real Estate Law",
    "Tax Law",
    "Employment Law",
    "Intellectual Property",
    "Environmental Law",
    "Other",
  ];

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
            isDark 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
              : 'bg-blue-600'
          }`}>
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Join LegalAssist
          </h2>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            {type === "lawyer"
              ? "Create your lawyer profile and start helping clients"
              : "Sign up to connect with qualified legal professionals and trained system"}
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            {type === "lawyer" ? (
              <>
                <Briefcase className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">
                  Lawyer Registration
                </span>
              </>
            ) : (
              <>
                <UserCheck className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  Client Registration
                </span>
              </>
            )}
          </div>
        </div>

        {/* Form */}
        <div className={`rounded-2xl shadow-xl p-8 transition-colors duration-300 ${
          isDark 
            ? 'bg-slate-800 border border-slate-700' 
            : 'bg-white'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={inputClass("name")}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClass("email")}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={inputClass("password")}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Phone Field (Lawyer only) */}
            {type === "lawyer" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={inputClass("phone")}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            )}
            {/* Charge */}
            {type === "lawyer" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Charge
                </label>
                <div className="relative">
                  {/* <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" /> */}
                  <input
                    type="number"
                    name="charge"
                    value={formData.charge}
                    onChange={handleInputChange}
                    className={inputClass("charge")}
                    placeholder="Enter your charge per hour (₹)"
                  />
                </div>
                {errors.charge && (
                  <p className="text-red-500 text-sm mt-1">{errors.charge}</p>
                )}
              </div>
            )}

            {/* Country Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Country
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={inputClass("country")}
                >
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>

            {/* Lawyer-specific fields */}
            {type === "lawyer" && (
              <>
                {/* Specialization Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Legal Specialization
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <select
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      className={inputClass("specialization")}
                    >
                      <option value="">Select your specialization</option>
                      {specializations.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.specialization && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.specialization}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Available From */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Available From
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="datetime-local"
                        name="availableFrom"
                        value={formData.availableFrom}
                        onChange={handleInputChange}
                        className={inputClass("availableFrom")}
                      />
                    </div>
                    {errors.availableFrom && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.availableFrom}
                      </p>
                    )}
                  </div>

                  {/* Available To */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Available To
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="datetime-local"
                        name="availableTo"
                        value={formData.availableTo}
                        onChange={handleInputChange}
                        className={inputClass("availableTo")}
                      />
                    </div>
                    {errors.availableTo && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.availableTo}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <a
                  href="/T&C"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/T&C"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {type === "lawyer" ? "Register as Lawyer" : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to={`/signin/${type}`}
                className="text-blue-600 hover:text-blue-500 font-semibold transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
